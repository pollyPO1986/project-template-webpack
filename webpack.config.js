const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  context: path.resolve(__dirname, './src'),
  entry: {
    index: 'index',
    about: 'about-us'
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: './js/[name].js?[hash:8]'
  },
  devServer: {
    compress: true,
    port: 3000,
    stats: {
      assets: true,
      cached: false,
      chunkModules: false,
      chunkOrigins: false,
      chunks: false,
      colors: true,
      hash: false,
      modules: false,
      reasons: false,
      source: false,
      version: false,
      warnings: false
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'initial',
          enforce: true
        }
      }
    }
  },
  resolve: {
    modules: [
      path.resolve('src'),
      path.resolve('src/js'),
      path.resolve('src/scss'),
      path.resolve('src/fonts'),
      path.resolve('src/images'),
      path.resolve('src/module'),
      path.resolve('node_modules')
    ],
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.(woff|woff2|ttf|eot|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        },
        include: path.resolve('src/fonts'),
        exclude: path.resolve('./node_modules')
      },
      {
        test: /\.(pug)$/,
        use: ['html-loader', 'pug-html-loader'],
        include: path.resolve('src/layout'),
        exclude: path.resolve('./node_modules')
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
        include: path.resolve('src/scss'),
        exclude: path.resolve('./node_modules')
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              outputPath: './images',
              name: '[name].[ext]?[hash:8]',
              publicPath: '../images'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              webp: {
                quality: 75
              }
            }
          }
        ],
        include: path.resolve('src/images'),
        exclude: path.resolve('./node_modules')
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
        include: path.resolve('.')
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './css/[name].css'
    }),
    new CopyWebpackPlugin([{ from: 'fonts', to: 'fonts' }]),
    new HtmlWebpackPlugin({
      title: 'Webpack前端自動化開發',
      filename: 'index.html',
      template: 'index.html',
      viewport: 'width=640, user-scalable=no',
      chunks: ['vendor', 'index']
    }),
    new HtmlWebpackPlugin({
      filename: 'about.html',
      template: 'layout/layout.pug',
      chunks: ['vendor', 'about']
    })
  ]
};
