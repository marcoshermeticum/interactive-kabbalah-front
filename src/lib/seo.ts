import type { Metadata } from 'next';
import { routing, type Locale } from '@/i18n/routing';

export const SITE_NAME = 'Interactive Kabbalah';
export const DEFAULT_LOCALE = routing.defaultLocale as Locale;

const FALLBACK_URL = 'http://localhost:3000';

export function siteUrl(): string {
  const detected =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : '');

  return (detected || FALLBACK_URL).trim().replace(/\/+$/, '');
}

export function absoluteUrl(pathname = '/'): string {
  return `${siteUrl()}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
}

type StaticRoute = keyof typeof routing.pathnames;

export function localizedPath(locale: Locale, route: StaticRoute): string {
  const entry = routing.pathnames[route];
  if (typeof entry === 'string') return `/${locale}${entry === '/' ? '' : entry}`;
  return `/${locale}${entry[locale]}`;
}

export function cardPath(locale: Locale, slug: string): string {
  return `/${locale}/tarot/${slug}`;
}

export function alternateLanguages(
  resolve: (locale: Locale) => string,
): Record<string, string> {
  const languages: Record<string, string> = {};

  for (const locale of routing.locales) {
    languages[locale] = absoluteUrl(resolve(locale as Locale));
  }
  languages['x-default'] = absoluteUrl(resolve(DEFAULT_LOCALE));

  return languages;
}

export function alternatesFor(locale: Locale, route: StaticRoute): Metadata['alternates'] {
  return {
    canonical: absoluteUrl(localizedPath(locale, route)),
    languages: alternateLanguages((target) => localizedPath(target, route)),
  };
}

export function cardAlternates(locale: Locale, slug: string): Metadata['alternates'] {
  return {
    canonical: absoluteUrl(cardPath(locale, slug)),
    languages: alternateLanguages((target) => cardPath(target, slug)),
  };
}

export const OG_LOCALE: Record<Locale, string> = {
  'pt-BR': 'pt_BR',
  'en-US': 'en_US',
  ja: 'ja_JP',
  he: 'he_IL',
};

export function openGraphLocales(locale: Locale): { locale: string; alternateLocale: string[] } {
  return {
    locale: OG_LOCALE[locale],
    alternateLocale: routing.locales
      .filter((candidate) => candidate !== locale)
      .map((candidate) => OG_LOCALE[candidate as Locale]),
  };
}

export function keywords(value: string): string[] {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

type SocialInput = {
  locale: Locale;
  title: string;
  description: string;
  url: string;
  image: { url: string; width?: number; height?: number; alt?: string };
};

export function socialMetadata({
  locale,
  title,
  description,
  url,
  image,
}: SocialInput): Pick<Metadata, 'openGraph' | 'twitter'> {
  return {
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      title,
      description,
      url,
      ...openGraphLocales(locale),
      images: [{ ...image, alt: image.alt ?? title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image.url],
    },
  };
}

export function clampText(value: string, max = 158): string {
  const text = value.replace(/\s+/g, ' ').trim();
  if (text.length <= max) return text;

  const cut = text.slice(0, max);
  const sentenceEnd = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '), cut.lastIndexOf('? '));
  if (sentenceEnd > 60) return cut.slice(0, sentenceEnd + 1);

  const wordEnd = cut.lastIndexOf(' ');
  return `${cut.slice(0, wordEnd > 0 ? wordEnd : max).trimEnd()}…`;
}

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
