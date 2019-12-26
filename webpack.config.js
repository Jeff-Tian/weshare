const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: { app: './src/index.tsx' },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
    port: process.env.PORT || 8080,
    historyApiFallback: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: '叽歪分享 | 向世界叽歪',
      template: './src/index.ejs',
      filename: './index.html',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist/from'),
    filename: process.env.NODE_ENV === 'production' ?
        '[name].[contenthash].js' :
        '[name].[hash].js',
    chunkFilename: process.env.NODE_ENV === 'production' ?
        '[name].[contenthash].js' :
        '[name].[hash].js',
    publicPath: process.env.NODE_ENV === 'production' ? '/from' : '/',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false, // Must be set to true if using source-maps in production
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        },
      }),
    ],
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        'antd-mobile': {
          test: /[\\/]node_modules[\\/](antd-mobile)[\\/]/,
          name: 'antd-mobile',
          chunks: 'all',
        },
        'react-dom': {
          test: /[\\/]node_modules[\\/](react-dom)[\\/]/,
          name: 'react-dom',
          chunks: 'all',
        },
        react: {
          test: /[\\/]node_modules[\\/](react)[\\/]/,
          name: 'react',
          chunks: 'all',
        },
        vendors: {
          test: /[\\/]node_moduels[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          'ts-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(csv|tsv)$/,
        use: [
          'csv-loader',
        ],
      },
      {
        test: /\.xml$/,
        use: [
          'xml-loader',
        ],
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
  },
  // externals: {
  //     "react": "React",
  //     "react-dom": "ReactDOM"
  // },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
}
