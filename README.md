# OpenTermsArchive.org

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

### Modules documentation

- [I18n](./src/modules/I18n/README.md)
- [Analytics](./src/modules/Analytics/README.md)
- [Scraper](./src/modules/Scraper/README.md)

## Contributing

See our [contributing guide](CONTRIBUTING.md).

---

## License

The code for this software is distributed under the European Union Public Licence (EUPL) v1.2.
Contact the author if you have any specific need or question regarding licensing.
