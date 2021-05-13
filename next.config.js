const { i18n } = require('./src/modules/I18n/next-i18next.config');

module.exports = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  i18n,
};
