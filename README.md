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
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Ndpnt"><img src="https://avatars.githubusercontent.com/u/1098708?v=4?s=100" width="100px;" alt="Nicolas Dupont"/><br /><sub><b>Nicolas Dupont</b></sub></a><br /><a href="https://github.com/OpenTermsArchive/opentermsarchive.org/commits?author=Ndpnt" title="Code">💻</a> <a href="#infra-Ndpnt" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://mattischneider.fr"><img src="https://avatars.githubusercontent.com/u/222463?v=4?s=100" width="100px;" alt="Matti Schneider"/><br /><sub><b>Matti Schneider</b></sub></a><br /><a href="https://github.com/OpenTermsArchive/opentermsarchive.org/commits?author=MattiSG" title="Code">💻</a> <a href="#projectManagement-MattiSG" title="Project Management">📆</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.clementbiron.com"><img src="https://avatars.githubusercontent.com/u/364319?v=4?s=100" width="100px;" alt="Clément Biron"/><br /><sub><b>Clément Biron</b></sub></a><br /><a href="https://github.com/OpenTermsArchive/opentermsarchive.org/commits?author=clementbiron" title="Code">💻</a> <a href="#design-clementbiron" title="Design">🎨</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/martinratinaud"><img src="https://avatars.githubusercontent.com/u/4191809?v=4?s=100" width="100px;" alt="Martin Ratinaud"/><br /><sub><b>Martin Ratinaud</b></sub></a><br /><a href="https://github.com/OpenTermsArchive/opentermsarchive.org/commits?author=martinratinaud" title="Code">💻</a> <a href="#infra-martinratinaud" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Cli4d"><img src="https://avatars.githubusercontent.com/u/56266330?v=4?s=100" width="100px;" alt="Clifford Ouma"/><br /><sub><b>Clifford Ouma</b></sub></a><br /><a href="https://github.com/OpenTermsArchive/opentermsarchive.org/pulls?q=is%3Apr+reviewed-by%3ACli4d" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/OpenTermsArchive/opentermsarchive.org/commits?author=Cli4d" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/emmanuellar"><img src="https://avatars.githubusercontent.com/u/41474439?v=4?s=100" width="100px;" alt="Amarachi Johnson-Ubah"/><br /><sub><b>Amarachi Johnson-Ubah</b></sub></a><br /><a href="https://github.com/OpenTermsArchive/opentermsarchive.org/pulls?q=is%3Apr+reviewed-by%3Aemmanuellar" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/OpenTermsArchive/opentermsarchive.org/commits?author=emmanuellar" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/michielbdejong"><img src="https://avatars.githubusercontent.com/u/408412?v=4?s=100" width="100px;" alt="Michiel de Jong"/><br /><sub><b>Michiel de Jong</b></sub></a><br /><a href="https://github.com/OpenTermsArchive/opentermsarchive.org/commits?author=michielbdejong" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/LVerneyPEReN"><img src="https://avatars.githubusercontent.com/u/58298410?v=4?s=100" width="100px;" alt="Lucas Verney"/><br /><sub><b>Lucas Verney</b></sub></a><br /><a href="https://github.com/OpenTermsArchive/opentermsarchive.org/commits?author=LVerneyPEReN" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/THouriezPEReN"><img src="https://avatars.githubusercontent.com/u/70654947?v=4?s=100" width="100px;" alt="Tom Houriez"/><br /><sub><b>Tom Houriez</b></sub></a><br /><a href="https://github.com/OpenTermsArchive/opentermsarchive.org/commits?author=THouriezPEReN" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/avernois"><img src="https://avatars.githubusercontent.com/u/765477?v=4?s=100" width="100px;" alt="Antoine Vernois"/><br /><sub><b>Antoine Vernois</b></sub></a><br /><a href="https://github.com/OpenTermsArchive/opentermsarchive.org/commits?author=avernois" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/vviers"><img src="https://avatars.githubusercontent.com/u/30295971?v=4?s=100" width="100px;" alt="Vincent Viers"/><br /><sub><b>Vincent Viers</b></sub></a><br /><a href="https://github.com/OpenTermsArchive/opentermsarchive.org/commits?author=vviers" title="Code">💻</a> <a href="#data-vviers" title="Data">🔣</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/cquest"><img src="https://avatars.githubusercontent.com/u/1202668?v=4?s=100" width="100px;" alt="Christian Quest"/><br /><sub><b>Christian Quest</b></sub></a><br /><a href="#infra-cquest" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/AaronjSugarman"><img src="https://avatars.githubusercontent.com/u/82889095?v=4?s=100" width="100px;" alt="Aaron Sugarman"/><br /><sub><b>Aaron Sugarman</b></sub></a><br /><a href="https://github.com/OpenTermsArchive/opentermsarchive.org/commits?author=AaronjSugarman" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/karnauskas"><img src="https://avatars.githubusercontent.com/u/1094012?v=4?s=100" width="100px;" alt="Marius Karnauskas"/><br /><sub><b>Marius Karnauskas</b></sub></a><br /><a href="https://github.com/OpenTermsArchive/opentermsarchive.org/commits?author=karnauskas" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/GatienH"><img src="https://avatars.githubusercontent.com/u/6501059?v=4?s=100" width="100px;" alt="GatienH"/><br /><sub><b>GatienH</b></sub></a><br /><a href="https://github.com/OpenTermsArchive/opentermsarchive.org/commits?author=GatienH" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/mvidonne"><img src="https://avatars.githubusercontent.com/u/46820105?v=4?s=100" width="100px;" alt="Marie-Pierre Vidonne"/><br /><sub><b>Marie-Pierre Vidonne</b></sub></a><br /><a href="#data-mvidonne" title="Data">🔣</a> <a href="https://github.com/OpenTermsArchive/opentermsarchive.org/pulls?q=is%3Apr+reviewed-by%3Amvidonne" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Amustache"><img src="https://avatars.githubusercontent.com/u/5108539?v=4?s=100" width="100px;" alt="Stache"/><br /><sub><b>Stache</b></sub></a><br /><a href="https://github.com/OpenTermsArchive/opentermsarchive.org/pulls?q=is%3Apr+reviewed-by%3AAmustache" title="Reviewed Pull Requests">👀</a> <a href="#infra-Amustache" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/afisher3578"><img src="https://avatars.githubusercontent.com/u/92438650?v=4?s=100" width="100px;" alt="Alex Fisher"/><br /><sub><b>Alex Fisher</b></sub></a><br /><a href="https://github.com/OpenTermsArchive/opentermsarchive.org/commits?author=afisher3578" title="Code">💻</a> <a href="#infra-afisher3578" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/pdehaye"><img src="https://avatars.githubusercontent.com/u/3274335?v=4?s=100" width="100px;" alt="Paul-Olivier Dehaye"/><br /><sub><b>Paul-Olivier Dehaye</b></sub></a><br /><a href="https://github.com/OpenTermsArchive/opentermsarchive.org/commits?author=pdehaye" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/guillett"><img src="https://avatars.githubusercontent.com/u/1410356?v=4?s=100" width="100px;" alt="Thomas Guillet"/><br /><sub><b>Thomas Guillet</b></sub></a><br /><a href="https://github.com/OpenTermsArchive/opentermsarchive.org/commits?author=guillett" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Kissaki"><img src="https://avatars.githubusercontent.com/u/93181?v=4?s=100" width="100px;" alt="Jan Klass"/><br /><sub><b>Jan Klass</b></sub></a><br /><a href="https://github.com/OpenTermsArchive/opentermsarchive.org/commits?author=Kissaki" title="Code">💻</a> <a href="https://github.com/OpenTermsArchive/opentermsarchive.org/pulls?q=is%3Apr+reviewed-by%3AKissaki" title="Reviewed Pull Requests">👀</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Harshil-Jani"><img src="https://avatars.githubusercontent.com/u/79367883?v=4?s=100" width="100px;" alt="Harshil Jani"/><br /><sub><b>Harshil Jani</b></sub></a><br /><a href="https://github.com/OpenTermsArchive/opentermsarchive.org/commits?author=Harshil-Jani" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/AdrienFines"><img src="https://avatars.githubusercontent.com/u/41912392?v=4?s=100" width="100px;" alt="Adrien Fines"/><br /><sub><b>Adrien Fines</b></sub></a><br /><a href="https://github.com/OpenTermsArchive/opentermsarchive.org/commits?author=AdrienFines" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://twitter.com/marineguillaum"><img src="https://opentermsarchive.org/images/contributors/marine-guillaume.jpg?s=100" width="100px;" alt="Marine Guillaume"/><br /><sub><b>Marine Guillaume</b></sub></a><br /><a href="#promotion" title="Promotion">📣</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://twitter.com/lvdefranssu"><img src="https://opentermsarchive.org/images/contributors/louis-victor-de-franssu.jpg?s=100" width="100px;" alt="Louis-Victor de Franssu"/><br /><sub><b>Louis-Victor de Franssu</b></sub></a><br /><a href="#promotion" title="Promotion">📣</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://twitter.com/hureaux"><img src="https://opentermsarchive.org/images/contributors/jeremy-hureaux.jpg?s=100" width="100px;" alt="Jeremy Hureaux"/><br /><sub><b>Jeremy Hureaux</b></sub></a><br /><a href="#promotion" title="Promotion">📣</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.linkedin.com/in/lua-streit/"><img src="https://opentermsarchive.org/images/contributors/lua-streit.jpg?s=100" width="100px;" alt="Luã Streit"/><br /><sub><b>Luã Streit</b></sub></a><br /><a href="#data" title="Data">🔣</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.linkedin.com/in/laurie-liddell-bb4278b3/"><img src="https://opentermsarchive.org/images/contributors/laurie-liddell.jpg?s=100" width="100px;" alt="Laurie Liddell"/><br /><sub><b>Laurie Liddell</b></sub></a><br /><a href="#data" title="Data">🔣</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://www.linkedin.com/in/raphael-bartlome-840006164/"><img src="https://opentermsarchive.org/images/contributors/raphael-bartlome.jpg?s=100" width="100px;" alt="Raphael Bartlomé"/><br /><sub><b>Raphael Bartlomé</b></sub></a><br /><a href="#data" title="Data">🔣</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.linkedin.com/in/chlo%C3%A9-legendre-2b014a1a6/"><img src="https://opentermsarchive.org/images/contributors/chloe-legendre.jpg?s=100" width="100px;" alt="Chloé Legendre"/><br /><sub><b>Chloé Legendre</b></sub></a><br /><a href="#data" title="Data">🔣</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.linkedin.com/in/constance-dauvergne-1811a5192/"><img src="https://opentermsarchive.org/images/contributors/constance-dauvergne.jpg?s=100" width="100px;" alt="Constance Dauvergne"/><br /><sub><b>Constance Dauvergne</b></sub></a><br /><a href="#data" title="Data">🔣</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.linkedin.com/in/lucie-lechardoy-b092b745/"><img src="https://opentermsarchive.org/images/contributors/lucie-lechardoy.jpg?s=100" width="100px;" alt="Lucie Lechardoy"/><br /><sub><b>Lucie Lechardoy</b></sub></a><br /><a href="#data" title="Data">🔣</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.linkedin.com/in/paolo-calderoni/"><img src="https://opentermsarchive.org/images/contributors/paolo-calderoni.jpg?s=100" width="100px;" alt="Paolo Calderoni"/><br /><sub><b>Paolo Calderoni</b></sub></a><br /><a href="#data" title="Data">🔣</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.linkedin.com/in/giacomo-stazi-a14a15136/"><img src="https://opentermsarchive.org/images/contributors/giacomo-stazi.jpg?s=100" width="100px;" alt="Giacomo Stazi"/><br /><sub><b>Giacomo Stazi</b></sub></a><br /><a href="#data" title="Data">🔣</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://twitter.com/Elsa_Trujillo_"><img src="https://opentermsarchive.org/images/contributors/elsa-trujillo.jpg?s=100" width="100px;" alt="Elsa Trujillo"/><br /><sub><b>Elsa Trujillo</b></sub></a><br /><a href="#promotion" title="Promotion">📣</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://www.linkedin.com/in/siegridhenry/"><img src="https://opentermsarchive.org/images/contributors/siegrid-henry.jpg?s=100" width="100px;" alt="Siegrid Henry"/><br /><sub><b>Siegrid Henry</b></sub></a><br /><a href="#promotion" title="Promotion">📣</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://twitter.com/mathildsl"><img src="https://opentermsarchive.org/images/contributors/mathilde-saliou.jpg?s=100" width="100px;" alt="Mathilde Saliou"/><br /><sub><b>Mathilde Saliou</b></sub></a><br /><a href="#content" title="Content">🖋</a> <a href="#data" title="Data">🔣</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.linkedin.com/in/thomas-reboul-29a46569/"><img src="https://opentermsarchive.org/images/contributors/thomas-reboul.jpg?s=100" width="100px;" alt="Thomas Reboul"/><br /><sub><b>Thomas Reboul</b></sub></a><br /><a href="#data" title="Data">🔣</a></td>
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
