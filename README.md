# OpenTermsArchive.org

This is the repository for `opentermsarchive.org`, the website that presents the [Open Terms Archive](https://github.com/ambanum/OpenTermsArchive) project.

## Introduction

Build on [Next.js](https://nextjs.org) react framework, using [TypeScript](https://www.typescriptlang.org/) and [PostCSS](https://postcss.org/).

## Configuration

Copy `.env.example` to `.env` file at the root of the project and fill in the values of the constants.

##### `GITHUB_TOKEN`, `GITHUB_REPO` and `GITHUB_LABEL_ADD`

In order for the service to automatically create issues in Github when a service is failing, you need to provide:

- `GITHUB_TOKEN`: A token with repository privileges which allow access to the [GitHub API](https://github.com/settings/tokens).
- `GITHUB_REPO`: A repository which will be used to create the issues. For example `OpenTermsArchive/services-all`
- `GITHUB_LABEL_ADD`: The name of the label used on the repo to categorize issues corresponding to a service that needs to be added (default is `add`)

**Note**: OTA.org will automatically create issues with a label defined by `GITHUB_LABEL_ADD`. **This specific label has to exist in the corresponding repository for the automatic issue creation works.**

### Contribution interface

The contribution interface, located at `/contribute` will help the user to create new services easily.

Clicking on `Validate` can automatically create an issue un a github repository.

For this, you need to setup some constants in your `.env`

```
GITHUB_TOKEN_CREATE_ISSUE= #create one with repo privileges here https://github.com/settings/tokens
GITHUB_OTA_OWNER=ambanum
GITHUB_OTA_REPO=test-repo# or OpenTermsArchive
```

In case this automatic creation does not work, a fallback on the previous email system will occur, opening a `mailto` link with prepopulated data.

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
<MDXRemote {...(mdxContent as any)} components={{ Button: Button }} />
```

In `my-page.mdx`:

```mdx
<Button type="secondary">Read</Button>
```

## Modules documentation

- [I18n](./src/modules/I18n/README.md)
- [Analytics](./src/modules/Analytics/README.md)
- [Scraper](./src/modules/Scraper/README.md)

## Contributing

See our [contributing guide](CONTRIBUTING.md).
