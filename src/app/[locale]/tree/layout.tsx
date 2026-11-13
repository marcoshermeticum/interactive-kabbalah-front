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
  const t = await getTranslations({ locale: current, namespace: 'seo.tree' });

  const title = t('title');
  const description = clampText(t('description'));

  return {
    title,
    description,
    keywords: keywords(t('keywords')),
    alternates: alternatesFor(current, '/tree'),
    ...socialMetadata({
      locale: current,
      title,
      description,
      url: absoluteUrl(localizedPath(current, '/tree')),
      image: {
        url: absoluteUrl('/landing/hero-tree.png'),
        width: 400,
        height: 498,
        alt: title,
      },
    }),
  };
}

export default function TreeLayout({ children }: Props) {
  return children;
}
