const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.less', '.scss']
  },
  module: {
    loaders: [
      { test: /\.js|.jsx?$/, loaders: ['babel-loader'] },
      { test: /\.css?$/,       
        use: ExtractTextPlugin.extract({
          use: ['css-loader']
        }) 
      },
      { test: /\.jpg?$/, loaders: ['file-loader'] },
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'static' },
      { from: 'assets' },
    ]),
    new ExtractTextPlugin({
      filename: 'styles.css'
    })
  ],
  devServer: {
    contentBase: './dist',
    port: 8085,
    historyApiFallback: true
  },
};