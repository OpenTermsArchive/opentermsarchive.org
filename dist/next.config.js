"use strict";
const i18nConfig = require('./src/modules/I18n/next-i18next.config');
const { version } = require('./package.json');
module.exports = Object.assign(Object.assign({ basePath: process.env.NEXT_PUBLIC_BASE_PATH || '' }, i18nConfig), { serverRuntimeConfig: {
        // Will only be available on the server side
        scrapedFilesFolder: '.next/tmp/services',
        scrapedIframeUrl: '/iframe/services', // url on which the files in the above folder will be accessible
    }, publicRuntimeConfig: {
        version,
    }, images: {
        domains: ['avatars.githubusercontent.com'],
    }, webpack(config) {
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
                source: '/fr/press',
                destination: '/fr/media',
                permanent: true,
            },
            {
                source: '/en/press',
                destination: '/en/media',
                permanent: true,
            },
            {
                source: '/homepage',
                destination: '/',
                permanent: true,
            },
        ];
    } });
