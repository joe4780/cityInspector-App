const webpack = require('webpack');

module.exports = {
  transpileDependencies: true,

  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_DEVTOOLS__: false, // Disable Vue Devtools in production
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_HYDRATION__: true,
        // Add other feature flags as needed
      })
    ]
  },

  chainWebpack: config => {
    // Adjust webpack config to resolve components correctly
    config.resolve.alias
      .set('@', resolve('src')) // Example alias for src folder

    // Modify other webpack settings if necessary
  },

  // Other options as needed
};
