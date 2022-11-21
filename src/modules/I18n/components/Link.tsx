import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const permalinks: { [key: string]: { [key: string]: string } } =
  publicRuntimeConfig.permalinks || {};

export const i18nMap: { [key: string]: string } = Object.entries(permalinks).reduce(
  (acc, [originalSlug, permalinks]) => ({
    ...acc,
    ...Object.entries(permalinks || {}).reduce(
      (acc2, [locale, permalink]) => ({
        ...acc2,
        [`/${locale}${originalSlug}`]: `/${locale}${permalink}`,
        [`/en${permalink}`]: originalSlug,
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
