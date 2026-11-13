import type { MetadataRoute } from 'next';
import { routing, type Locale } from '@/i18n/routing';
import { isCardAvailable, majorArcana } from '@/data/tarot/majorArcana';
import { absoluteUrl, alternateLanguages, cardPath, localizedPath } from '@/lib/seo';

type StaticRoute = keyof typeof routing.pathnames;

const routes: {
  route: StaticRoute;
  priority: number;
  changeFrequency: 'weekly' | 'monthly';
}[] = [
  { route: '/', priority: 1, changeFrequency: 'weekly' },
  { route: '/tree', priority: 0.9, changeFrequency: 'monthly' },
  { route: '/tarot', priority: 0.9, changeFrequency: 'monthly' },
  { route: '/alchemical-symbols', priority: 0.7, changeFrequency: 'monthly' },
];

/**
 * Localized sitemap: every entry repeats the language alternates so search
 * engines pair the four translations of the same page.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const { route, priority, changeFrequency } of routes) {
    for (const locale of routing.locales) {
      entries.push({
        url: absoluteUrl(localizedPath(locale as Locale, route)),
        changeFrequency,
        priority,
        alternates: {
          languages: alternateLanguages((target) => localizedPath(target, route)),
        },
      });
    }
  }

  // Only cards that already have an interactive page. `tarot:new` adds the
  // card to `cardData`, so a freshly created card joins the sitemap on the
  // next build without touching this file.
  for (const card of majorArcana.filter((entry) => isCardAvailable(entry.slug))) {
    for (const locale of routing.locales) {
      entries.push({
        url: absoluteUrl(cardPath(locale as Locale, card.slug)),
        changeFrequency: 'yearly',
        priority: 0.5,
        alternates: {
          languages: alternateLanguages((target) => cardPath(target, card.slug)),
        },
      });
    }
  }

  return entries;
}
