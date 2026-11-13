import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { redirect } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';
import { getMajorArcana } from '@/data/tarot/majorArcana';
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params;
  const current = locale as Locale;
  const entry = getMajorArcana(id);
  if (!entry) return { robots: { index: false, follow: true } };

  const tc = await getTranslations({ locale: current, namespace: 'tarotWaite.cards' });
  const ts = await getTranslations({ locale: current, namespace: 'seo.card' });

  const name = tc(`${entry.i18nKey}.name`);
  const title = ts('title', { name, roman: entry.roman });
  const intro = tc.has(`${entry.i18nKey}.summary`)
    ? tc(`${entry.i18nKey}.summary`)
    : ts('description', { name, roman: entry.roman, number: entry.number });
  const description = clampText(intro);

  return {
    title,
    description,
    keywords: keywords(ts('keywords', { name, roman: entry.roman, number: entry.number })),
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
        alt: name,
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
  const entry = getMajorArcana(id);

  if (!entry) {
    redirect({ href: '/tarot', locale: current });
    return null;
  }

  const tc = await getTranslations({ locale: current, namespace: 'tarotWaite.cards' });
  const ts = await getTranslations({ locale: current, namespace: 'seo.card' });
  const tnav = await getTranslations({ locale: current, namespace: 'seo' });
  const tt = await getTranslations({ locale: current, namespace: 'seo.tarot' });

  const name = tc(`${entry.i18nKey}.name`);
  const url = absoluteUrl(cardPath(current, entry.slug));
  const intro = tc.has(`${entry.i18nKey}.summary`)
    ? tc(`${entry.i18nKey}.summary`)
    : ts('description', { name, roman: entry.roman, number: entry.number });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: `${ts('title', { name, roman: entry.roman })} · ${tnav('siteName')}`,
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
      <TarotCardDetail entry={entry} />
    </>
  );
}
