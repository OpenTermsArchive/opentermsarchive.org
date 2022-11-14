module.exports = {
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  keySeparator: false, // to be able to use `.` in the key names
  logBuild: false,
  pages: {
    '*': ['common', 'header', 'footer', 'follow-us'],
    '/': ['homepage', 'instances'],
    '/stats': ['stats'],
    '/budget': ['budget'],
    '/media': ['media'],
    '/subscribe': ['subscribe'],
  },
};
