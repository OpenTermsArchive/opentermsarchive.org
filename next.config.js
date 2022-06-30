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
  async rewrites() {
    return [
      {
        source: '/data/api/:slug*',
        destination: 'http://51.75.169.235:7011/data/api/:slug*',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              // object-src 'none'. Recommended on https://csp-evaluator.withgoogle.com/
              // style-src 'unsafe-inline'. because nextjs inlines CSS
              // img-src data:. because next/image component inlines data images
              // img-src http*. for all images in contributors list
              // script-src 'unsafe-eval'. because next or one package needs it
              "default-src 'self'; script-src 'self' 'unsafe-eval' https://stats.data.gouv.fr; object-src 'none'; style-src 'self' 'unsafe-inline'; img-src 'self'  https://media-exp1.licdn.com data: https://www.gravatar.com https://avatars.githubusercontent.com https://pbs.twimg.com https://sibyll.in; frame-src 'self' https://stats.data.gouv.fr",
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};
