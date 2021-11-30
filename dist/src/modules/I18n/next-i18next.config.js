"use strict";
module.exports = {
    defaultNS: 'common',
    i18n: {
        defaultLocale: 'catchAll',
        locales: ['en', 'fr', 'catchAll'],
    },
    // https://github.com/vercel/next.js/discussions/18419
    // TO BE REMOVED alog with catchAll when this feature request is done
    async redirects() {
        return JSON.parse(JSON.stringify([
            {
                source: '/catchAll',
                destination: '/en',
                locale: false,
                permanent: false,
            },
            {
                source: '/catchAll/(!api/):slug*',
                destination: '/en/:slug*',
                locale: false,
                permanent: false,
            },
        ]));
    },
    // https://github.com/vercel/next.js/issues/22508
    react: {
        useSuspense: false,
    },
};
