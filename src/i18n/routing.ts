import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['pt-BR', 'en-US', 'ja', 'he'],
  defaultLocale: 'pt-BR',

  // Localized (translated) pathnames.
  // Keys are the INTERNAL paths (the physical route segments under
  // src/app/[locale]); values are the localized slugs shown in the URL.
  pathnames: {
    '/': '/',
    '/tree': {
      'pt-BR': '/arvore-da-vida',
      'en-US': '/tree-of-life',
      ja: '/inochi-no-ki',
      he: '/etz-hachaim',
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
