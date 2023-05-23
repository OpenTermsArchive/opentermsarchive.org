# i18n module

## Install

1. Copy this module

and run

```
    npm install next-translate
```

2. Create the config file

```
touch i18n.js
echo "module.exports = require('./src/modules/I18n/i18n');" >> i18n.js
```

We will keep the config file in the module but next-translate requires the file to be at the root of the project

3. import the config file

modify your `next.config.js` with

```
const nextTranslate = require('next-translate');

module.exports = nextTranslate({
  ...
});

```

## Usage

See https://github.com/aralroca/next-translate#readme

### Main concept

Translations are located in

- a `locales` folder at the root of the project containing a folder per each language with json files
- a `content` folder at the root of the project containing a folder per each language with mdx files

When coding, translations key strings should be of type `<namespace>:key`.
The namespace should reflect the page you're in, or if it's a component, the module you're in.

Example:

- `service:seo.title`
- `home:title`
- `contribute:contributors.subtitle`

### Translate simple strings

```
{t('contribute:service_page.title')}
{t('contribute:service_page.title-with-value', { value: 'Dynamic value' })}
{t('contribute:service_page.title-with-value', { dynamicValue: 'Dynamic value' }, { fallback: "A title with {{dynamicValue}}" })}
```

### Translate html

```
<Trans i18nKey="contribute:service_page.description1">
  Most of the time, contractual documents contains a header, a footer, navigation
  menus, possibly ads… We aim at tracking only{' '}
  <strong>the significant parts of the document</strong>
</Trans>
```

### Language Switching

A component called `LanguageSwitcher` is available in the `components` folder.

### Translate complete files with mdx

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
        {mdxContent && <MDXRemote {...mdxContent} components={{}} />}
      </Container>
    </Layout>
  );
}

export const getStaticProps = withI18n({ folder: "static", filename: "terms-of-service" })();
```

### Translate slugs

This is kind of a tricky thing to do with nextJs so this is a basic implementation that aims at being automatized better.

1. Create a `permalinks.json` file in `modules/i18n` for translating slugs of pages in `src/pages` folder

```
{
  "/about": {
    "fr": "/a-propos",
    ...
  },
  ...
}
```

2. Use the next config plugin provided in this modules's `next.config.js`

```
const nextI18nRoutes = require('./src/modules/I18n/next.config');
module.exports = nextI18nRoutes({
  ...
})
```

3. Replace all links with I18n Link

```
import Link from 'next/link';
# becomes
import { Link } from 'modules/I18n';
```

4. Use `permalink` frontmatter value in `content/pages/*.mdx` files

**Note**: this will only work in translated files, as for the default language, the file name will be taken into account

```
---
title: Page Title
permalink: /a-propos
---

Markdown text
...
```

## VSCode snippets

Get fast with these snippets

```
  "snippet-t": {
    "prefix": "t",
    "body": [
      "import { useTranslation } from 'modules/I18n'",
      "const { t, tC } = useTranslation();"
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
