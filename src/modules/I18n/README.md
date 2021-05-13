# i18n module

## install

1. Copy this module

and run

```
    yarn add next-i18nnext
    yarn add -D i18next-scanner i18next-scanner-typescript
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
    "i18n": "yarn i18n:extract && yarn i18n:clean",
    "i18n:extract": "NODE_ENV=development i18next-scanner --config 'src/modules/I18n/i18next-scanner.config.js'",
    "i18n:clean": "find public/locales -size 3c -delete",

```

## usage

See https://github.com/isaachinman/next-i18next

## generate translation files

```
yarn i18n
```
