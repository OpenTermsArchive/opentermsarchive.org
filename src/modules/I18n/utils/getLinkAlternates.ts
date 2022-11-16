import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const permalinks: { [key: string]: { [key: string]: string } } =
  publicRuntimeConfig.permalinks || {};

export const permalinksToOriginal: { [key: string]: string } = Object.entries(permalinks).reduce(
  (acc, [originalSlug, permalinks]) => ({
    ...acc,
    ...Object.entries(permalinks || {}).reduce(
      (acc2, [locale, permalink]) => ({
        ...acc2,
        [`/${locale}${permalink}`]: originalSlug,
      }),
      {}
    ),
  }),
  {}
);

export default function getLinkAlternates({
  url,
  locale,
  locales,
}: {
  url: string;
  locale: string;
  locales: string[];
}) {
  const baseUrl = permalinksToOriginal[`/${locale}${url}`] || url;

  const permalinkToOriginal = permalinks[baseUrl] || {};

  const links = [
    {
      key: `alternate_x-default`,
      hrefLang: 'x-default',
      href: baseUrl,
    },
  ];

  (locales || []).forEach((locale) => {
    links.push({
      key: `alternate_${locale}`,
      hrefLang: locale,
      href: permalinkToOriginal[locale] ? `/${locale}${permalinkToOriginal[locale]}` : baseUrl,
    });
  });

  return links;
}
