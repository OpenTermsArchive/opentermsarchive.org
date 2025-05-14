# OpenTermsArchive.org

The website that presents Open Terms Archive to the general public.

## Installation

### Environment variables

Set the `UPTIMEROBOT_API_KEY` environment variable:

1. Locally: copy the `.env.example` file to `.env` and set the value
2. On GitHub: Repository Settings → Secrets and variables → Actions → New repository secret
3. On Netlify: Site configuration → Environment variables → Add a variable

### Dependencies

#### Hugo

[Install Hugo](https://gohugo.io/getting-started/installing/) in version `0.147.1` edition `extended`.

##### With Homebrew

1. Add Open Terms Archive homebrew tap: `brew tap OpenTermsArchive/homebrew-tap`
2. Remove any previous installation of Hugo: `brew unlink hugo`
3. Install Hugo: `brew install hugo@0.147.1`

See [Open Terms Archive homebrew tap](https://github.com/OpenTermsArchive/homebrew-tap) for more information.

#### Node.js and npm dependencies

[Install Node.js](https://nodejs.org), then install npm dependencies with the following commands:

```sh
git clone https://github.com/OpenTermsArchive/opentermsarchive.org
cd docs
npm install
```

## Usage

### Building the site

```sh
hugo
```

The website will be built in the `public` directory.

### Serving the app locally

For development purposes:

```sh
npm run start:dev
```

### Linting Markdown files

To lint the Markdown files use the following command:

```sh
npm run lint:markdown
```

To apply automatic corrections use the following command:

```sh
npm run lint:markdown -- --fix
```

### Linting CSS files

To lint the CSS files use the following command:

```sh
npm run lint:css
```

To apply automatic corrections use the following command:

```sh
npm run lint:css -- --fix
```

### Linting JavaScript files

To lint the JavaScript files use the following command:

```sh
npm run lint:js
```

To automatically fix, where possible, problems reported:

```sh
npm run lint:js -- --fix
```

### Linting HTML files

To lint the HTML files use the following command:

```sh
npm run lint:html
```

To automatically fix, where possible, problems reported:

```sh
npm run lint:html -- --fix
```

### Testing

Run the entire test set

```sh
npm run test
```

#### Check for broken links

```sh
npm run test:links
```

#### Check for HTML validation

```sh
npm run test:html
```

Note that because of CloudFlare protection, tests on external links are not run in CI so as not to block on 503 errors.

#### Check for end-to-end

```sh
npm run test:e2e
```

## Deployment

The `main` branch is used on production and automatically deployed through GitHub pages. Refer to the configuration file `.github/workflows/gh-pages.yml`.

For each pull request, a preview is automatically deployed through Netlify and a comment on the GitHub pull request display the necessary information, such as the preview URL. The configuration can be found in `netlify.toml` file.

## Contributing

See our [contributing guide](CONTRIBUTING.md).

---

## License

The code for this software is distributed under the European Union Public Licence (EUPL) v1.2.
Contact the author if you have any specific need or question regarding licensing.
