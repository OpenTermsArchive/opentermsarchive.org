const namespaces = require('./namespaces.json');

module.exports = {
  defaultNS: 'common',
  i18n: {
    defaultLocale: 'default',
    locales: ['en', 'fr', 'default'],
    localePath: 'src/translations',
  },
  ns: namespaces,
  // https://github.com/vercel/next.js/issues/22508
  react: {
    useSuspense: false,
  },
};
