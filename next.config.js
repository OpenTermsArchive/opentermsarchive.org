const i18nConfig = require('./src/modules/I18n/next-i18next.config');
const { version } = require('./package.json');

module.exports = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  ...i18nConfig,
  images: {
    domains: ['avatars.githubusercontent.com', 'pbs.twimg.com'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      // issuer section restricts svg as component only to
      // svgs imported from js / ts files.
      //
      // This allows configuring other behavior for
      // svgs imported from other file types (such as .css)
      issuer: { and: [/\.(js|ts|md)x?$/] },
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: { plugins: [{ removeViewBox: false }] },
          },
        },
      ],
    });
    return config;
  },
  async redirects() {
    return [
      {
        source: '/press',
        destination: '/media',
        permanent: true,
      },
      {
        source: '/homepage',
        destination: '/',
        permanent: true,
      },
      {
        source: '/how-it-works',
        destination: '/',
        permanent: true,
      },
      {
        source: '/en/contribute/:slug',
        destination: 'https://contribute.opentermsarchive.org/en/:slug',
        permanent: true,
        locale: false,
      },
      {
        source: '/fr/contribute/:slug',
        destination: 'https://contribute.opentermsarchive.org/fr/:slug',
        permanent: true,
        locale: false,
      },
    ];
  },
};
