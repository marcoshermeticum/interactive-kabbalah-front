import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import {
  absoluteUrl,
  alternatesFor,
  clampText,
  keywords,
  localizedPath,
  socialMetadata,
} from '@/lib/seo';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const current = locale as Locale;
  const t = await getTranslations({ locale: current, namespace: 'seo.tarot' });
  const ts = await getTranslations({ locale: current, namespace: 'seo' });

  const title = t('title');
  const description = clampText(t('description'));

  return {
    // `absolute` avoids a double suffix on the catalog; `template` is
    // re-declared so child segments (the card page) keep inheriting it.
    title: { absolute: title, template: ts('titleTemplate') },
    description,
    keywords: keywords(t('keywords')),
    alternates: alternatesFor(current, '/tarot'),
    ...socialMetadata({
      locale: current,
      title,
      description,
      url: absoluteUrl(localizedPath(current, '/tarot')),
      image: {
        url: absoluteUrl('/landing/hero-tarot.png'),
        width: 1024,
        height: 576,
        alt: title,
      },
    }),
  };
}

export default function TarotLayout({ children }: Props) {
  return children;
}
