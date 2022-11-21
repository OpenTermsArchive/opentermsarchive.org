const nextTranslate = require('next-translate');
const fs = require('fs');
const path = require('path');

const { getI18nContentFilePaths, getI18nPermalinks } = require('./utils');

const permalinksToRewriteRules = (permalinks) =>
  Object.entries(permalinks).reduce(
    (acc, [originalSlug, permalinks]) => [
      ...acc,
      ...Object.entries(permalinks).reduce(
        (acc2, [locale, i18nSlug]) => [
          ...acc2,
          {
            source: `/${locale}${i18nSlug}`,
            destination: `/${locale}${originalSlug}`,
            locale: false,
          },
        ],
        []
      ),
    ],
    []
  );

module.exports = (nextConfig) => {
  const nextTranslateConfig = nextTranslate(nextConfig);
  const { locales, defaultLocale } = nextTranslateConfig.i18n;

  const permalinks = getI18nPermalinks(locales, defaultLocale);

  return {
    ...nextTranslateConfig,
    publicRuntimeConfig: {
      ...nextTranslateConfig.publicRuntimeConfig,
      permalinks,
    },
    async rewrites() {
      const existingRewrites = nextTranslateConfig.rewrites
        ? await nextTranslateConfig.rewrites()
        : [];
      return [...permalinksToRewriteRules(permalinks), ...existingRewrites];
    },
  };
};
