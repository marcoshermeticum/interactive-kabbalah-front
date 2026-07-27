import Script from 'next/script';

/**
 * Google Analytics 4 (GA4) component.
 * 
 * SETUP:
 * 1. Go to https://analytics.google.com
 * 2. Create a new GA4 property
 * 3. Get your Measurement ID (starts with G-)
 * 4. Set NEXT_PUBLIC_GA_ID in your .env.local file
 * 
 * The component only loads in production (or when GA_ID is set).
 */

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function GoogleAnalytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
