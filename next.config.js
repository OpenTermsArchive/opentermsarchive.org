const i18nConfig = require('./src/modules/I18n/next-i18next.config');
const { version } = require('./package.json');

module.exports = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  ...i18nConfig,
  serverRuntimeConfig: {
    // Will only be available on the server side
    scrapedFilesFolder: '.next/tmp/services', // where to store the files retrieved by puppeteer calls
    scrapedIframeUrl: '/iframe/services', // url on which the files in the above folder will be accessible
  },
  publicRuntimeConfig: {
    version,
  },
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
};
