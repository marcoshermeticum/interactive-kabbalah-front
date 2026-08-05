import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Exclude /admin and /api routes from locale middleware
  matcher: ['/', '/(pt-BR|en-US|ja|he)/:path*', '/((?!api|admin|_next|_vercel|.*\\..*).*)'],
};
