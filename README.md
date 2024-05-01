# OpenTermsArchive.org

The website that presents Open Terms Archive to the general public.

## Installation

### Dependencies

This website is built using [Hugo](https://gohugo.io), a static website editor, and uses [Node.js](https://nodejs.org).

To build it, [install Hugo](https://gohugo.io/getting-started/installing/) (>= v0.114.0) and [Node.js](https://nodejs.org), and then:

```sh
git clone https://github.com/OpenTermsArchive/opentermsarchive.org
cd docs
npm install
hugo
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
