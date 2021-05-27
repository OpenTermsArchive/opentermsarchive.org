module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-mixins': {},
    'postcss-easings': {},
    'postcss-flexbugs-fixes': {},
    'postcss-calc': {},
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 1,
    },
  },
};
