module.exports = {
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  keySeparator: false, // to be able to use `.` in the key names
  logBuild: false,
  pages: {
    '*': ['common', 'header', 'footer'],
    '/': ['homepage', 'instances'],
    '/about': ['about'],
    '/case-studies': ['case-studies'],
    '/stats': ['stats'],
    '/subscribe/done': ['subscribe/done'],
    '/subscribe/confirm': ['subscribe/confirm'],
    '/subscribe/french-elections': ['subscribe/french-elections'],
    '/budget': ['budget'],
    '/media': ['media'],
    '/subscribe': ['subscribe'],
  },
};
