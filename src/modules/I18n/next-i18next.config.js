module.exports = {
  defaultNS: 'common',
  i18n: {
    defaultLocale: 'default',
    locales: ['en', 'fr', 'default'],
    localePath: 'src/translations',
  },
  // https://github.com/vercel/next.js/issues/22508
  react: {
    useSuspense: false,
  },
};
