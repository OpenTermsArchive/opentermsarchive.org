module.exports = {
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  keySeparator: false, // to be able to use `.` in the key names
  logBuild: false,
  pages: {
    '*': ['common', 'header', 'footer', 'follow-us'],
    '/': ['homepage', 'collections'],
    'rgx:/case-studies': ['case-studies'], // using regex to match case-studies index and single page, see: https://github.com/aralroca/next-translate#3-configuration
    'rgx:/domain': ['domain','collections'], // using regex to match domain index and single page, see: https://github.com/aralroca/next-translate#3-configuration
    '/stats': ['stats'],
    '/budget': ['budget'],
    '/media': ['media'],
  },
};
