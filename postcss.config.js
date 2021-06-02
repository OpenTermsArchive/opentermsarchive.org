module.exports = {
  plugins: {
    'postcss-mixins': {
      //Path to mixin file
      mixinsFiles: './src/modules/Common/styles/mixins.css',
    },
    'postcss-flexbugs-fixes': {},
    'postcss-custom-media': {
      importFrom: './src/modules/Common/styles/custom-media-queries.css',
    },
    'postcss-nesting': {},
    // When enabled, build fails so we remove this until we find what's going on
    // This will prevent website to work on IE11 but we could not find a working solution for now
    // 'postcss-custom-properties': {
    //   //Necessary to make next working, todo: publish an issue
    //   importFrom: './src/modules/Common/styles/custom-properties.css',
    // },
    'postcss-calc': {
      // Adds warnings when calc() are not reduced to a single value.
      //warnWhenCannotResolve: true,
    },
    'postcss-easings': {},
    autoprefixer: {
      //Add prefixes only for final and IE versions of specification (see browserslist in package.json)
      flexbox: 'no-2009',
    },
  },
};
