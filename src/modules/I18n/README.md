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

modify you `next.config.js` with

```
const { i18n } = require('./src/modules/I18n/next-i18next.config');

module.exports = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  i18n,
};

```

4. add tools to your script to generate translations

```
    "i18n": "npm run i18n:extract && npm run i18n:clean && echo '\n⚠️  You may need to restart your dev server\n'",
    "i18n:extract": "NODE_ENV=development i18next-scanner --config 'src/modules/I18n/i18next-scanner.config.js'",
    "i18n:clean": "find src/translations -size 3c -delete && rm -Rf src/translations/catchAll",
```

5. replace build script

Because next will create all pages on build, it will complain of not having the catchAll route which we do not want to keep using
So we simply temporarily copy it and remove it after generation

```
    "build": "cp -R src/translations/en src/translations/catchAll && next build && tsc --project tsconfig.server.json && rm -Rf src/translations/catchAll",
```

## usage

See https://github.com/isaachinman/next-i18next

There are also some new wrappers to ease the use on `pages`

You can use it with

```
import { withI18n } from 'modules/I18n';

export const getStaticProps = withI18n()();
```

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

instead of the documented feature whicj I found too verbose and not typescript proof

```
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'footer']),
  }
})
```

### translate simple strings

```
{t('contribute:service_page.title', 'What is expected from you')}
```

### translate html

```
<Trans i18nKey="contribute:service_page.description1">
  Most of the time, contractual documents contains a header, a footer, navigation
  menus, possibly ads… We aim at tracking only{' '}
  <strong>the significant parts of the document</strong>
</Trans>
```

### translate complete files with mdx

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
