module.exports = {
  defaultNS: 'common',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'zh-Hant'],
  },
  // https://github.com/vercel/next.js/issues/22508
  react: {
    useSuspense: false,
    wait: true,
  },
};
