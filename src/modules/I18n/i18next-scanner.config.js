const {
  i18n: {
    locales,
    localePath
  },
} = require('./next-i18next.config');
const fs = require('fs');
const path = require('path');
const fg = require('fast-glob');
const uniq = require('lodash/fp/uniq')
const typescriptTransform = require('i18next-scanner-typescript');

const namespaces = fg
  .sync(['src/modules/*', 'src/modulesAdmin/*', 'src/api/modules/*'], {
    onlyDirectories: true,
    deep: 1,
  })
  .filter((o) => !o.includes('__tests__'))
  .map((o) => o.toLowerCase().replace('src/modules/', ''));

const pagesNamespaces = fg
  .sync(['src/pages/**/*.tsx', 'src/**/pages/**/*.tsx'], {
    onlyFiles: true,
    ignore: ['src/pages/_app.tsx']
  })
  .map((o) => o.toLowerCase().replace('src/pages/', '').replace('src/modules/', '').replace('/pages/', '/'))
  .map((o) => o.replace('.tsx', ''))
  .map((o) => o.replace('/index', ''))
  .filter((o) => o !== 'index');

const allNamespaces = uniq([...namespaces, ...pagesNamespaces, 'footer', 'header']).sort((a, b) => a.localeCompare(b));

console.log('The available namespaces are :');
allNamespaces.forEach((o) => console.log(` ‣ ${o}`));

fs.writeFileSync(path.join(__dirname, 'namespaces.json'), JSON.stringify(allNamespaces, null, 2));
/*
 * Doc: https://github.com/i18next/i18next-scanner
 */
module.exports = {
  input: ['src/**/*.{js,ts,tsx,jsx}'],
  options: {
    debug: false,
    removeUnusedKeys: false,
    sort: true,
    func: {
      list: ['t', 'i18next.t', 'translate'],
      extensions: ['.js', '.jsx'],
    },
    trans: {
      defaultsKey: 'defaults',
      component: 'Trans',
      i18nKey: 'i18nKey',
      extensions: ['.js', '.jsx'],
      fallbackKey: (ns, value) => {
        return value;
      },
      acorn: {
        ecmaVersion: 10, // defaults to 10
        sourceType: 'module', // defaults to 'module'
        // Check out https://github.com/acornjs/acorn/tree/master/acorn#interface for additional options
      },
    },
    lngs: locales.filter(locale => locale !== "default"),
    ns: allNamespaces,
    defaultNs: 'missing-namespace',
    defaultValue: '__STRING_NOT_TRANSLATED__',
    resource: {
      loadPath: 'src/translations/{{lng}}/{{ns}}.json',
      savePath: 'src/translations/{{lng}}/{{ns}}.json',
    },
    nsSeparator: ':', // namespace separator
    keySeparator: false, // key separator
    interpolation: {
      prefix: '{{',
      suffix: '}}',
    },
  },
  transform: typescriptTransform({
    extensions: ['.ts', '.tsx'],
    tsOptions: {
      target: 'es2018', // if not here, <Trans component will not be parsed
    },
  }),
};
