import Head from 'next/head';
import React from 'react';
import { useRouter } from 'next/router';
const twitterUser = 'OpenTerms';
const websiteName = 'opentermsarchive.org';
const type = 'website';

export default function CommonHead({
  title = 'Open Terms Archive',
  description = '',
  twitterCard,
  url,
  children,
}: {
  title: string;
  description?: string;
  twitterCard?: string;
  url?: string;
  children?: any;
}) {
  const router = useRouter();
  const currentUrl = url || router.asPath;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />

      <link rel="alternate" href={`${currentUrl}`} hrefLang="x-default" />
      {(router?.locales || [])
        .filter((locale) => locale !== 'default')
        .map((locale) => (
          <link
            key={`alternate_${locale}`}
            rel="alternate"
            href={`${locale === router.defaultLocale ? '' : `/${locale}`}${currentUrl}`}
            hrefLang={locale}
          />
        ))}

      {/* TWITTER https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/summary */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={twitterCard} />
      {twitterUser && <meta name="twitter:site" content={twitterUser} />}

      {/* OPENGRAPH https://ogp.me/ */}
      <meta property="og:title" content={title} />
      {currentUrl && <meta property="og:url" content={currentUrl} />}
      <meta property="og:type" content={type} />
      {description && <meta property="og:description" content={description} />}
      {websiteName && <meta property="og:site_name" content={websiteName} />}

      <link rel="canonical" href={currentUrl} />

      {children}
    </Head>
  );
}
