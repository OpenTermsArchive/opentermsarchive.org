import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const i18nSlugs: { [key: string]: { [key: string]: string } } = publicRuntimeConfig.i18nSlugs || {};

export const i18nMap: { [key: string]: string } = Object.entries(i18nSlugs).reduce(
  (acc, [originalSlug, i18nSlugs]) => ({
    ...acc,
    ...Object.entries(i18nSlugs || {}).reduce(
      (acc2, [locale, i18nSlug]) => ({
        ...acc2,
        [`/${locale}${originalSlug}`]: `/${locale}${i18nSlug}`,
        [`/en${i18nSlug}`]: originalSlug,
      }),
      {}
    ),
  }),
  {}
);

const I18nLink = ({ href, locale, ...props }: any) => {
  const router = useRouter();
  const wantedLocale = locale || router.locale;
  let i18nProps: any = {
    href,
    locale,
  };

  if (i18nMap[`/${wantedLocale}${href}`]) {
    i18nProps = {
      href: i18nMap[`/${wantedLocale}${href}`],
      locale: false,
    };
  }

  return <Link {...i18nProps} {...props} />;
};

export default I18nLink;
