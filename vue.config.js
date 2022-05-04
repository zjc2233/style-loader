const path = require("path");
const { VueLoaderPlugin } = require('vue-loader');
module.exports = {
    publicPath: './',
    configureWebpack: {
      module: {
        rules: [
        {
            test: /\.vue$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: path.resolve(__dirname, 'loader/style-pxtorem')
                },
                // 'vue-loader'
            ]
        },
        ]
      },
      plugins: [
            // new VueLoaderPlugin(),
        ]
    }
  }