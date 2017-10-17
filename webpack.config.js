const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './app/app.tsx',
    vendor: ['react', 'react-dom'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  target: 'electron-renderer',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
      },
      {
        test: /\.ts(x)?$/,
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader',
        }),
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        test: /\.svg$/,
        use:
          'url-loader?limit=65000&mimetype=image/svg+xml&name=static/[name].[hash].[ext]',
      },
      {
        test: /\.woff$/,
        use:
          'url-loader?limit=65000&mimetype=application/font-woff&name=static/[name].[hash].[ext]',
      },
      {
        test: /\.woff2$/,
        use:
          'url-loader?limit=65000&mimetype=application/font-woff2&name=static/[name].[hash].[ext]',
      },
      {
        test: /\.[ot]tf$/,
        use:
          'url-loader?limit=65000&mimetype=application/octet-stream&name=static/[name].[hash].[ext]',
      },
      {
        test: /\.eot$/,
        use:
          'url-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=static/[name].[hash].[ext]',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      verbose: true,
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: false,
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest'],
      minChunks: 'Infinity',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
