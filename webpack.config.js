const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|ico)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
          },
        ],
      },
    ],
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './src',
    compress: true,
    hot: true,
    open: true,
    port: 8080,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Breaking News 2.0',
      template: path.resolve(__dirname, './src/index.html'),
      inject: 'body',
      minify: {
        //collapseWhitespace: true,
      },
    }),
  ],
}
