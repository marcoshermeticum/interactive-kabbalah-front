import { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { EB_Garamond, Inter } from 'next/font/google';
import { getMessages, getTranslations } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import MicrosoftClarity from '@/components/MicrosoftClarity';
import CookieNotice from '@/components/CookieNotice';
import { NavigationLoadingProvider } from '@/components/NavigationLoading';
import { VakinhaCampaignProvider } from '@/components/Notifications/VakinhaCampaignProvider';
import type { Locale } from '@/i18n/routing';
import {
  SITE_NAME,
  absoluteUrl,
  alternatesFor,
  keywords,
  localizedPath,
  openGraphLocales,
  serializeJsonLd,
  siteUrl,
} from '@/lib/seo';
import '../globals.css';

const garamond = EB_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-garamond',
});

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-inter',
});

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const current = locale as Locale;
  const t = await getTranslations({ locale: current, namespace: 'seo' });
  const title = t('defaultTitle');
  const description = t('defaultDescription');
  const image = absoluteUrl('/landing/hero-tarot.png');

  return {
    metadataBase: new URL(siteUrl()),
    title: { default: title, template: t('titleTemplate') },
    description,
    applicationName: SITE_NAME,
    keywords: keywords(t('keywords')),
    authors: [{ name: SITE_NAME, url: siteUrl() }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: 'spirituality',
    alternates: alternatesFor(current, '/'),
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      title,
      description,
      url: absoluteUrl(localizedPath(current, '/')),
      ...openGraphLocales(current),
      images: [{ url: image, width: 1024, height: 576, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    icons: {
      icon: [
        { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-192.png', sizes: '192x192', type: 'image/png' },
      ],
      apple: [{ url: '/favicon-192.png', sizes: '192x192', type: 'image/png' }],
    },
    manifest: '/manifest.webmanifest',
    formatDetection: { telephone: false },
    appleWebApp: { capable: true, title: SITE_NAME, statusBarStyle: 'default' },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fff9eb' },
    { media: '(prefers-color-scheme: dark)', color: '#0f0e0c' },
  ],
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const dir = locale === 'he' ? 'rtl' : 'ltr';
  const t = await getTranslations({ locale: locale as Locale, namespace: 'seo' });
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl()}/#website`,
        name: SITE_NAME,
        url: absoluteUrl(localizedPath(locale as Locale, '/')),
        inLanguage: locale,
        description: t('defaultDescription'),
        publisher: { '@id': `${siteUrl()}/#organization` },
      },
      {
        '@type': 'Organization',
        '@id': `${siteUrl()}/#organization`,
        name: SITE_NAME,
        url: siteUrl(),
        logo: { '@type': 'ImageObject', url: absoluteUrl('/favicon-192.png') },
      },
    ],
  };

  return (
    <html lang={locale} dir={dir} className={`${garamond.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4170456120089512"
          crossOrigin="anonymous"
        />
        <script defer src="https://cloud.umami.is/script.js" data-website-id="2a693d97-8387-4b71-bf4d-20cdfaf00a9c"></script>
        {/* Inline theme script — applies dark class before paint to avoid flash/hydration mismatch */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
      </head>
      <body className="overflow-hidden touch-manipulation" suppressHydrationWarning>
        <GoogleAnalytics />
        <MicrosoftClarity />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <NavigationLoadingProvider>
            <VakinhaCampaignProvider>
              {children}
              <CookieNotice />
            </VakinhaCampaignProvider>
          </NavigationLoadingProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
