module.exports = {
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  keySeparator: false, // to be able to use `.` in the key names
  logBuild: false,
  pages: {
    '*': ['common', 'header', 'footer'],
    '/': ['homepage', 'instances', 'follow-us'],
    '/about': ['about'],
    '/case-studies': ['case-studies', 'follow-us'],
    '/stats': ['stats'],
    '/budget': ['budget'],
    '/media': ['media'],
    '/subscribe': ['subscribe'],
  },
};
