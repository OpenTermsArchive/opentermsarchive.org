# i18n module

## install

1. Copy this module

and run

```
    npm run install next-i18nnext
    npm run install -D i18next-scanner i18next-scanner-typescript
```

2. Create the config file

```
touch next-i18next.config.js
echo "module.exports = require('./src/modules/I18n/next-i18next.config');" >> next-i18next.config.js
cat next-i18next.config.js
```

We will keep the config file in the module but next-i18nnext requires the file to ba at the root of the project

3. import the config file

modify your `next.config.js` with

```
const { i18n } = require('./src/modules/I18n/next-i18next.config');

module.exports = {
  ...
  i18n,
  ...
};

```

4. Add provider to `_app.tsx`

```
import { appWithTranslation } from 'next-i18next';
import useLocale from 'modules/I18n/hooks/useLocale';

function App({ Component, pageProps }: AppProps) {
  useLocale(pageProps.locale);
  return <Component {...pageProps} />;
}

export default appWithTranslation(App);
```

5. Add middleware to `_middleware.tsx`

```
import { NextRequest } from 'next/server';
import i18nMiddleware from 'modules/I18n/middleware';

export function middleware(request: NextRequest) {
  return i18nMiddleware(request);
}
```

6. add tools to your script to generate translations

```
    "i18n": "npm run i18n:extract && npm run i18n:clean && echo '\n⚠️  You may need to restart your dev server\n'",
    "i18n:extract": "NODE_ENV=development i18next-scanner --config 'src/modules/I18n/i18next-scanner.config.js'",
    "i18n:clean": "find src/translations -size 3c -delete",
```

7. replace build script

Because next will create all pages on build, it will complain of not having the default route which we do not want to keep using
So we simply temporarily copy it and remove it after generation

```
    "build": "cp -R src/translations/en src/translations/default && next build && tsc --project tsconfig.server.json && rm -Rf src/translations/default",
```

## usage

See https://github.com/isaachinman/next-i18next

### main concept

When coding, translations key strings should be of type `<namespace>:key`.
The namespace should reflect the page you're in, of if it's a component, the module you're in.

Example:

- `contribute/service:seo.title`
- `contribute/home:title`
- `contribute:subscribe_form.email.placeholder`

You should use the `useTranslation` hook provided by [next-i18next](https://github.com/isaachinman/next-i18next)

Example:

```
import { useTranslation } from 'next-i18next';

const SubscribeForm = () => {
  const { t } = useTranslation();

  return <div>{t("contribute:subscribe_form.email.placeholder")}<div>
}
```

Once your code is clear, you need to generate the translation files by using the command `npm run i18n`.

It will inspect your code and create one file per namespace in the `src/translations` folder (and copy all namespaces in a static file in `modules/I18n` [See here for why](#why-do-we-need-a-namespaces-json-file))

All pages must load the translations server side so that it does not impact the page load.

In order to do this, you can

### wrap your page in an simple HOC

```
import { withI18n } from 'modules/I18n';

export const getStaticProps = withI18n()();
```

The `withI18n` can take some options such as

- `namespaces: if you wish to load only some namespaces (This is not necesary)
- `load: 'mdx' filename: 'home'` to load the content of a translation mdx file located in the `src/translations` folder

### wrap your page in a HOC and extend it for your own purposes

or if you need some more treatment

```
import { withI18n } from 'modules/I18n';

export const getStaticProps = withI18n()(async (props: any) => {
  // do something
  return {
    props,
  };
});
```

### Use the default way of next-i18next

The above solution has been developed instead of the documented feature which I found too verbose and not typescript proof

```
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'footer']),
  }
})
```

## translate simple strings

```
{t('contribute:service_page.title', 'What is expected from you')}
```

## translate html

```
<Trans i18nKey="contribute:service_page.description1">
  Most of the time, contractual documents contains a header, a footer, navigation
  menus, possibly ads… We aim at tracking only{' '}
  <strong>the significant parts of the document</strong>
</Trans>
```

## translate complete files with mdx

You can use the helper `withI18n` to ask for content of mdx files that are located in the same folder and with the name structure `<filename>.<lang>.mdx`

Then you can use it as you like or with this example

```
import { WithI18nResult, withI18n } from 'modules/I18n';

import Container from 'modules/Common/containers/Container';
import Layout from 'modules/Common/containers/Layout';
import { MDXRemote } from 'next-mdx-remote';
import React from 'react';

export default function TermsOfServicePage({ mdxContent }: WithI18nResult) {
  return (
    <Layout>
      <Container gridCols="12" gridGutters="11" paddingX={false}>
        <MDXRemote {...(mdxContent as any)} components={{}} />
      </Container>
    </Layout>
  );
}

export const getStaticProps = withI18n({ load: 'mdx' })();
```

## Why do we need a namespaces json file

`next-i18nnext` is willing to be used in a very declarative way, always telling for each page which module it should be loading (through the `namespaces` options).
Problem is that if you happen to not load a namespace file used by a descendant component, you can end up with not translated data on your page and not a lot of clues on why it is so.

I thus made a choice to load all namespaces at once in memory so that it's available everywhere.

Loading them dynamically through a `glob` request was causing errors as i18n config is loaded client side and server side, so I made the choice to generate this static file when generating the translation files.

## generate translation files

```
npm run i18n
```

## VSCode snippets

Get fast with these snippets

```
  "snippet-t": {
    "prefix": "t",
    "body": [
      "import { useTranslation } from 'next-i18next';",
      "const { t } = useTranslation();"
    ],
    "description": "use translation hook"
  },
  "snippet-t(": {
    "prefix": "t(",
    "body": [
      "t('${TM_DIRECTORY/^.*\\/src\\/modules\\/(.*)\\/(.*)/${1:/downcase}/}:$1','$2')"
    ],
    "description": "use translation function"
  },
  "snippet-trans": {
    "prefix": "trans",
    "body": [
      "<Trans i18nKey=\"${TM_DIRECTORY/^.*\\/src\\/modules\\/(.*)\\/(.*)/${1:/downcase}/}:$1\">",
      "",
      "</Trans>"
    ],
    "description": "use translation component"
  }
```
