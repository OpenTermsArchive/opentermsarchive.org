module.exports = {
  plugins: [
    'postcss-easy-import',
    'postcss-mixins',
    'postcss-nested',
    'postcss-easings',
    'postcss-flexbugs-fixes',
    'postcss-calc',
    'postcss-animation',
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 1,
      },
    ],
  ],
};
