const nextTranslate = require('next-translate');
const i18nSlugs = require('./i18nSlugs.json');

const i18nRewrites = Object.entries(i18nSlugs).reduce(
  (acc, [originalSlug, i18nSlugs]) => [
    ...acc,
    ...Object.entries(i18nSlugs).reduce(
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
  return nextTranslate({
    ...nextConfig,
    publicRuntimeConfig: {
      ...nextConfig.publicRuntimeConfig,
      i18nSlugs,
    },
    async rewrites() {
      const existingRewrites = nextConfig.rewrites ? await nextConfig.rewrites() : [];
      return [...i18nRewrites, ...existingRewrites];
    },
  });
};
