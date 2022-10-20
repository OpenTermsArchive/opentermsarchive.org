# i18n module

## install

1. Copy this module

and run

```
    npm run install next-translate
```

2. Create the config file

```
touch i18n.js
echo "module.exports = require('./src/modules/I18n/i18n');" >> i18n.js
```

We will keep the config file in the module but next-i18nnext requires the file to be at the root of the project

3. import the config file

modify your `next.config.js` with

```
const nextTranslate = require('next-translate');

module.exports = nextTranslate({
  ...
});

```

## usage

See https://github.com/aralroca/next-translate#readme

### main concept

Translations are located in

- a `locales` folder at the root of the project containing a folder per each language with json files
- a `content` folder at the root of the project containing a folder per each language with mdx files

When coding, translations key strings should be of type `<namespace>:key`.
The namespace should reflect the page you're in, or if it's a component, the module you're in.

Example:

- `service:seo.title`
- `home:title`
- `contribute:subscribe_form.email.placeholder`

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

You can use the helper `withMdx` to ask for content of mdx files that are located in the `content` folder and with the name structure `<folder>/<filename>.<lang>.mdx`

Then you can use it as you like or with this example

```
import withMdx, { WithMdxResult } from 'modules/I18n/hoc/withMdx';

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

export const getStaticProps = withI18n({ load: 'mdx', folder: "static", filename: "terms-of-service" })();
```

## VSCode snippets

Get fast with these snippets

```
  "snippet-t": {
    "prefix": "t",
    "body": [
      "import useTranslation from 'next-translate/useTranslation'",
      "const { t } = useTranslation();"
    ],
    "description": "use translation hook"
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
