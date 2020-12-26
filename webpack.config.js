const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
module.exports = {
  mode: 'development',
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
    new CopyPlugin({
      patterns: [{ from: 'src/index.html', to: './' }],
    }),
  ],
}
