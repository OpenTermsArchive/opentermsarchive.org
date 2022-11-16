const nextTranslate = require('next-translate');
const permalinks = require('./permalinks.json');

const i18nRewrites = Object.entries(permalinks).reduce(
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
  return nextTranslate({
    ...nextConfig,
    publicRuntimeConfig: {
      ...nextConfig.publicRuntimeConfig,
      permalinks,
    },
    async rewrites() {
      const existingRewrites = nextConfig.rewrites ? await nextConfig.rewrites() : [];
      return [...i18nRewrites, ...existingRewrites];
    },
  });
};
