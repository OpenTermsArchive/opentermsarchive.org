const {
  i18n: { locales },
} = require('./next-i18next.config');
const fg = require('fast-glob');
const typescriptTransform = require('i18next-scanner-typescript');

const namespaces = fg
  .sync(['src/modules/*', 'src/modulesAdmin/*', 'src/api/modules/*'], {
    onlyDirectories: true,
    deep: 1,
  })
  .filter((o) => !o.includes('__tests__'))
  .map((o) => o.toLowerCase().replace('src/modules/', ''));

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
      extensions: ['.js', '.jsx'],
      fallbackKey: (ns, value) => {
        return value;
      },
    },
    lngs: locales,
    ns: [...namespaces],
    defaultNs: 'missing-namespace',
    defaultValue: '__STRING_NOT_TRANSLATED__',
    resource: {
      loadPath: 'public/locales/{{lng}}/{{ns}}.json',
      savePath: 'public/locales/{{lng}}/{{ns}}.json',
    },
    nsSeparator: ':', // namespace separator
    keySeparator: false, // key separator
    interpolation: {
      prefix: '{{',
      suffix: '}}',
    },
  },
  transform: typescriptTransform({ extensions: ['.ts', '.tsx'] }),
};
