module.exports = {
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  keySeparator: false, // to be able to use `.` in the key names
  logBuild: false,
  pages: {
    '*': ['common', 'header', 'footer', 'follow-us', 'case-studies'],
    '/': ['homepage', 'instances'],
    '/case-studies': ['case-studies'],
    '/stats': ['stats'],
    '/budget': ['budget'],
    '/media': ['media'],
    '/subscribe': ['subscribe'],
  },
};
