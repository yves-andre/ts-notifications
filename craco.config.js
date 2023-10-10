const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    style: {
      modules: {
        localIdentName: '[local]_[hash:base64:4]',
      },
    },
    webpack: {
      plugins: {
        remove: [ 'MiniCssExtractPlugin' ],
        add:[
          new MiniCssExtractPlugin({ 
            filename: 'static/css/[name].[contenthash:8].css',
            chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
            insert: '#root'
          }),
        ]
      },
    },
  }