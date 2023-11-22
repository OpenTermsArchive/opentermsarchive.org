import Head from 'next/head';
import React from 'react';
import { getLinkAlternates } from 'modules/I18n';
import { useRouter } from 'next/router';
import { words } from 'lodash';
const websiteName = 'opentermsarchive.org';
const type = 'website';
const MAX_DESC_WORDS = 25;

export default function CommonHead({
  title = 'Open Terms Archive',
  description = '',
  url,
  children,
}: {
  title: string;
  description?: string;
  url?: string;
  children?: any;
}) {
  const router = useRouter();
  const currentUrl = url || router.asPath;
  const alternateLinks = getLinkAlternates({
    url: currentUrl,
    locale: router.locale || 'en',
    locales: router.locales || [],
  });

  let shortenedDescription = `${words(description).slice(0, MAX_DESC_WORDS).join(' ')}`;
  shortenedDescription =
    words(description).length >= MAX_DESC_WORDS
      ? `${shortenedDescription}${'…'}`
      : `${shortenedDescription}${'.'}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={shortenedDescription} />
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />

      {alternateLinks.map((link) => (
        <link rel="alternate" {...link} />
      ))}

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
