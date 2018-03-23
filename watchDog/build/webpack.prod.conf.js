const path = require('path')
const webpack = require('webpack')
const config = require('./config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = function (_env) {
    return merge(baseWebpackConfig, {
        output: {
            path: config.build.assetsRoot,
            filename: path.posix.join(config.build.assetsSubDirectory, 'js/[name].[chunkhash].js'),
            chunkFilename: path.posix.join(config.build.assetsSubDirectory, 'js/[id].[chunkhash].js')
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: config.build.env 
                },
                NODE_ENV: JSON.stringify(_env)
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            }),
            // extract css into its own file
            new ExtractTextPlugin({
                filename: path.posix.join(config.build.assetsSubDirectory, 'css/[name].[contenthash].css')
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: 'src/index.html',
                inject: true,
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true
                },
                chunksSortMode: 'dependency'
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: function (module, count) {
                    // any required modules inside node_modules are extracted to vendor
                    return (
                        module.resource &&
                        /\.js$/.test(module.resource) &&
                        module.resource.indexOf(
                            path.join(__dirname, '../node_modules')
                        ) === 0
                    )
                }
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'manifest',
                chunks: ['vendor']
            })
        ]
    })
}