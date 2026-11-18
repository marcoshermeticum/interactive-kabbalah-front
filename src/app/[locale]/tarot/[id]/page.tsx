import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { redirect } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';
import { getTarotEntry, type TarotEntry } from '@/data/tarot/catalog';
import {
  absoluteUrl,
  cardAlternates,
  cardPath,
  clampText,
  keywords,
  localizedPath,
  serializeJsonLd,
  siteUrl,
  socialMetadata,
} from '@/lib/seo';
import TarotCardDetail from './TarotCardDetail';

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

/** Title and description inputs shared by the page metadata and the JSON-LD. */
async function cardTexts(locale: Locale, target: TarotEntry) {
  const tc = await getTranslations({ locale, namespace: 'tarotWaite.cards' });
  const tm = await getTranslations({ locale, namespace: 'tarotWaite.minor' });
  const { entry } = target;
  const name = tc(`${entry.i18nKey}.name`);
  const summary = tc.has(`${entry.i18nKey}.summary`) ? tc(`${entry.i18nKey}.summary`) : '';

  if (target.kind === 'minor') {
    const ts = await getTranslations({ locale, namespace: 'seo.minorCard' });
    const suit = tm(`suits.${target.entry.suit}`);
    return {
      name,
      title: ts('title', { name }),
      description: summary || ts('description', { name, suit }),
      keywords: ts('keywords', { name, suit }),
    };
  }

  const ts = await getTranslations({ locale, namespace: 'seo.card' });
  const { roman, number } = target.entry;
  return {
    name,
    title: ts('title', { name, roman }),
    description: summary || ts('description', { name, roman, number }),
    keywords: ts('keywords', { name, roman, number }),
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params;
  const current = locale as Locale;
  const target = getTarotEntry(id);
  if (!target) return { robots: { index: false, follow: true } };

  const { entry } = target;
  const texts = await cardTexts(current, target);
  const title = texts.title;
  const description = clampText(texts.description);

  return {
    title,
    description,
    keywords: keywords(texts.keywords),
    alternates: cardAlternates(current, entry.slug),
    ...socialMetadata({
      locale: current,
      title,
      description,
      url: absoluteUrl(cardPath(current, entry.slug)),
      image: {
        url: absoluteUrl(entry.image),
        width: 1086,
        height: 1810,
        alt: texts.name,
      },
    }),
  };
}

/**
 * Single card route. Known slugs render the detail component (interactive
 * card or "coming soon"); unknown slugs fall back to the catalog mosaic.
 */
export default async function TarotCardPage({ params }: Props) {
  const { locale, id } = await params;
  const current = locale as Locale;
  const target = getTarotEntry(id);

  if (!target) {
    redirect({ href: '/tarot', locale: current });
    return null;
  }

  const { entry } = target;
  const tnav = await getTranslations({ locale: current, namespace: 'seo' });
  const tt = await getTranslations({ locale: current, namespace: 'seo.tarot' });
  const texts = await cardTexts(current, target);

  const name = texts.name;
  const url = absoluteUrl(cardPath(current, entry.slug));
  const intro = texts.description;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: `${texts.title} · ${tnav('siteName')}`,
        description: clampText(intro),
        inLanguage: current,
        isPartOf: { '@id': `${siteUrl()}/#website` },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: absoluteUrl(entry.image),
        },
        breadcrumb: { '@id': `${url}#breadcrumb` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: tnav('breadcrumbHome'),
            item: absoluteUrl(localizedPath(current, '/')),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: tt('title'),
            item: absoluteUrl(localizedPath(current, '/tarot')),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name,
            item: url,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <TarotCardDetail target={target} />
    </>
  );
}
