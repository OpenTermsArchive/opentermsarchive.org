const { version } = require('./package.json');
const nextI18nRoutes = require('./src/modules/I18n/next.config');

module.exports = nextI18nRoutes({
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
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
      {
        source: '/fr/case-studies/instagram-blocks-data-retrieval-and-clarifies-what-information-it-retrieves',
        destination: '/fr/case-studies/instagram-bloque-la-recuperation-de-donnees-et-precise-les-informations-quelle-recupere',
        permanent: true,
        locale: false,
      },
      {
        source: '/fr/case-studies/qwant-details-data-shared-with-microsoft',
        destination: '/fr/case-studies/qwant-detaille-les-donnees-partagees-avec-microsoft',
        permanent: true,
        locale: false,
      },
      {
        source: '/fr/case-studies/protonmail-clarifies-its-privacy-policies',
        destination: '/fr/case-studies/protonmail-clarifie-ses-politiques-de-confidentialite',
        permanent: true,
        locale: false,
      },
      {
        source: '/fr/case-studies/pinterest-removes-privacy-shield-notice-without-updating-its-modification-date',
        destination: '/fr/case-studies/pinterest-retire-les-mentions-du-privacy-shield-sans-mettre-a-jour-la-date-de-modification',
        permanent: true,
        locale: false,
      },
      {
        source: '/fr/case-studies/alibaba-adds-disease-outbreaks-to-its-disclaimer',
        destination: '/fr/case-studies/alibaba-ajoute-les-epidemies-a-ses-clauses-dexclusion-de-responsabilite',
        permanent: true,
        locale: false,
      }
    ];
  },
  async rewrites() {
    return [
      {
        source: '/data/api/:slug*',
        destination: 'http://51.89.227.200:7011/data/api/:slug*',
      },
      {
        source: '/fr/case-studies/instagram-blocks-data-retrieval-and-clarifies-what-information-it-retrieves',
        destination: '/fr/case-studies/instagram-bloque-la-recuperation-de-donnees-et-precise-les-informations-quelle-recupere',
        locale: false,
      },
      {
        source: '/fr/case-studies/qwant-details-data-shared-with-microsoft',
        destination: '/fr/case-studies/qwant-detaille-les-donnees-partagees-avec-microsoft',
        locale: false,
      },
      {
        source: '/fr/case-studies/protonmail-clarifies-its-privacy-policies',
        destination: '/fr/case-studies/protonmail-clarifie-ses-politiques-de-confidentialite',
        locale: false,
      },
      {
        source: '/fr/case-studies/pinterest-removes-privacy-shield-notice-without-updating-its-modification-date',
        destination: '/fr/case-studies/pinterest-retire-les-mentions-du-privacy-shield-sans-mettre-a-jour-la-date-de-modification',
        locale: false,
      },
      {
        source: '/fr/case-studies/alibaba-adds-disease-outbreaks-to-its-disclaimer',
        destination: '/fr/case-studies/alibaba-ajoute-les-epidemies-a-ses-clauses-dexclusion-de-responsabilite',
        locale: false,
      }
    ];
  },
  async headers() {
    const securityPolicies = {
      'default-src': ["'self'"],
      'script-src': [
        "'self'",
        // next or one package is actually use `eval` or `new Function`
        "'unsafe-eval'",
        'https://stats.data.gouv.fr',
      ],
      // Recommended on https://csp-evaluator.withgoogle.com/
      'object-src': ["'none'"],
      'style-src': [
        "'self'",
        // nextjs inlines CSS
        "'unsafe-inline'",
      ],
      'connect-src': [
        "'self'",
        'https://stats.data.gouv.fr',
        // Allow webpack-hmr on local
        ...(process.env.NODE_ENV === 'development' ? ['ws://localhost:3000'] : []),
      ],
      'img-src': [
        "'self'",
        // next/image component inlines images with `src="data:..."`
        'data:',
        // all domains of images in contributors list
        'https://media-exp1.licdn.com',
        'https://www.gravatar.com',
        'https://avatars.githubusercontent.com',
        'https://pbs.twimg.com',
        'https://sibyll.in',
      ],
      'frame-src': ["'self'", 'https://stats.data.gouv.fr'],
    };

    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: Object.entries(securityPolicies)
              .map(([securityKey, values]) => `${securityKey} ${values.join(' ')}`)
              .join('; '),
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
});
