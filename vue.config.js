const webpack = require('webpack'); // Import webpack
const path = require('path'); // Import path for resolving paths

module.exports = {
  transpileDependencies: true,
  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/firebase-messaging-sw.js',
    }
  },

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
      .set('@', path.resolve(__dirname, 'src')) // Example alias for src folder

    // Modify other webpack settings if necessary
  },

  // Other options as needed
};
