import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const i18nSlugs: { [key: string]: { [key: string]: string } } = publicRuntimeConfig.i18nSlugs || {};

export const i18nSlugsToOriginal: { [key: string]: string } = Object.entries(i18nSlugs).reduce(
  (acc, [originalSlug, i18nSlugs]) => ({
    ...acc,
    ...Object.entries(i18nSlugs || {}).reduce(
      (acc2, [locale, i18nSlug]) => ({
        ...acc2,
        [`/${locale}${i18nSlug}`]: originalSlug,
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
  const baseUrl = i18nSlugsToOriginal[`/${locale}${url}`] || url;

  const i18nSlugToOriginal = i18nSlugs[baseUrl] || {};

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
      href: i18nSlugToOriginal[locale] ? `/${locale}${i18nSlugToOriginal[locale]}` : baseUrl,
    });
  });

  return links;
}
