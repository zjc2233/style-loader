const path = require("path");
const { VueLoaderPlugin } = require('vue-loader');
const counts = require('./plugin/count')

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
                    loader: path.resolve(__dirname, 'loader/style-pxtorem'),
                    options: {
                        // plugins:['./plugin/count.js']
                    }
                },
                // 'vue-loader'
            ]
        },
        // {
        //     test: /\.js$/,
        //     exclude: /node_modules/,
        //     use: [{
        //         loader: path.resolve(__dirname, 'loader/rely')
        //     }]
        // }
        ]
      },
      plugins: [
            // new VueLoaderPlugin(),
            // new counts()
        ]
    }
  }