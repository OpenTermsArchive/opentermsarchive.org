# OpenTermsArchive.org
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

The website that presents Open Terms Archive to the general public.

## Introduction

Build on [Next.js](https://nextjs.org) react framework, using [TypeScript](https://www.typescriptlang.org/) and [PostCSS](https://postcss.org/).

## Configuration

Copy `.env.example` to `.env` file at the root of the project and fill in the values of the constants.

Note that you can use [Nextjs Documentation](https://nextjs.org/docs/basic-features/environment-variables#loading-environment-variables) if you wish to add more environment variables

### `PORT`

Port on which the website will run.

Example `PORT=5000`
Default is `3000`

### `NEXT_PUBLIC_BASE_PATH`

To deploy the website under a sub-path of a domain you can use this env variable config option.

Example `NEXT_PUBLIC_BASE_PATH="/prefix"`
Default is empty

### `NEXT_PUBLIC_MATOMO_URL`, `NEXT_PUBLIC_MATOMO_SITE_ID`

You can easily set up analytics with [Matomo](https://matomo.org/) by providing those 2 values.

### `SENDINBLUE_API_KEY`

In order for users to be able to subscribe to services alerts, a mailling lists has been put in place with SendInBlue.

An API Key is thus needed

## Contribute

### Create new simple page

In order to create a simple page based on `markdown` syntax, just add a new file in the `content/static` folder.
The path and name you give it will reflect the URL available on the website.

Example:

```
content/
└── static
    ├── en
    │   ├── accessibility.mdx
    │   └── subscribe
    │       ├── confirm.mdx
    └── fr
        ├── accessibility.mdx
        └── subscribe
            ├── confirm.mdx
```

will give 2 URLs

- /accesibility
- /subscribe/confirm

with their i18n alternatives

- /accesibility
- /subscribe/confirm

**NOTE**: for now, i18n slugs are not supported and files in different locale folder should have the same name.

### Create new complex page

if you need custom components, you will need to create your own in the `src/pages` folder and follow [NextJs documentation](https://nextjs.org)

## Development

```
npm install
npm run dev
```

### Test to your local IP address

To test the site on multiple terminals, you may need to access the site from your local IP address.

Run `npm run dev -H YOUR.LOCAL.IP.ADRESS`

Note : on MacOS, get your local IP with `ipconfig getifaddr en0`

### MDX

As we use MDX ([mdxjs.com](https://mdxjs.com/)), we can use JSX in Markdown content with the `<MDXRemote />` component. This one takes a `components` parameter that lists React components that can be instantiated `.mdx` corresponding file.

Exemple to allow using a `Button` component in a `.mdx` file:

In `my-page.tsx`:

```jsx
{
  mdxContent && <MDXRemote {...mdxContent} components={{ Button: Button }} />;
}
```

In `my-page.mdx`:

```mdx
<Button type="secondary">Read</Button>
```

### Check the broken links

1. Build the app : `rm -rf .next && npm run build`
2. Start the app in background (production mode): `PORT=<PORT> npm run start &`
3. Launch the test `PORT=<PORT> npm run test:links`

#### Common errors

`  [0] http://localhost:<PORT>/. ERROR: Detected 1 broken links. Scanned 1 links in 0.013 seconds.` is triggered if you do not have started the app.

`Error: listen EADDRINUSE: address already in use 0.0.0.0:<PORT>` is triggered if you have already an app started in background. You can stop all processes running on the configured port with the command `npm run stop`. To close only the desired process you have to get the PID with `lsof -i :<PORT>` and kill it with `kill -p <PID>`.

### Modules documentation

- [I18n](./src/modules/I18n/README.md)
- [Analytics](./src/modules/Analytics/README.md)
- [Scraper](./src/modules/Scraper/README.md)

## Contributing

See our [contributing guide](CONTRIBUTING.md).

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://www.clementbiron.com"><img src="https://avatars.githubusercontent.com/u/364319?v=4?s=100" width="100px;" alt="Clément Biron"/><br /><sub><b>Clément Biron</b></sub></a><br /><a href="https://github.com/OpenTermsArchive/opentermsarchive.org/commits?author=clementbiron" title="Code">💻</a> <a href="#design-clementbiron" title="Design">🎨</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

---

## License

The code for this software is distributed under the European Union Public Licence (EUPL) v1.2.
Contact the author if you have any specific need or question regarding licensing.
