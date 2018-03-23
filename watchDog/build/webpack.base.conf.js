const config = require('./config')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrors = require('friendly-errors-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].[hash].bundle.js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.json$/,
                use: ['json-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    query: {
                        limit: 10000,
                        name: path.posix.join(config.build.assetsSubDirectory, 'imgs/[name].[hash:7].[ext]')
                    }
                }
            },
            {
               test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
               use: [{
                   loader: 'url-loader',
                   query: {
                       limit: 10000,
                       name: path.posix.join(config.build.assetsSubDirectory,'fonts/[name].[hash:7].[ext]')
                   }
               }]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
              test: /\.scss$/,
              include: [path.resolve(__dirname, "../src/scss")],
              use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'postcss-loader', 'sass-loader']
              })
            },
            {
                test: /\.scss$/,
                include: [path.resolve(__dirname, "../src")],
                exclude: [path.resolve(__dirname, "../src/scss")],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            sourceMap: true,
                            import: true,
                            localIdentName: '[name]__[local]--[hash:base64:5]'
                        }
                    }, 'postcss-loader', 'sass-loader']
                })
            },
            {
                test: /\.bundle\.js$/,
                use: 'bundle-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.json'],
        modules: [
            resolve('src'),
            resolve('node_modules')
        ],
        alias: {
            'src': path.resolve(__dirname, '../src'),
        }
    }
}
