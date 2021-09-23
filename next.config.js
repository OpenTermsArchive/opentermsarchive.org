const i18nConfig = require('./src/modules/I18n/next-i18next.config');
const { version } = require('./package.json');

module.exports = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  ...i18nConfig,
  publicRuntimeConfig: {
    version,
  },
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
};
