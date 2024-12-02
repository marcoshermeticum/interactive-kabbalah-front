import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en-US', 'pt-BR'],
  defaultLocale: 'pt-BR',
  localePrefix: {
    mode: 'always',
    prefixes: {
      'en-US': '/us',
      'pt-BR': '/br',
    },
  },
  pathnames: {
    '/loja': '/shop',
    '/shop': {
      'pt-BR': '/loja',
      'en-US': '/shop',
    },
    '/cart': {
      'pt-BR': '/loja',
      'en-US': '/cart',
    },
  },
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
