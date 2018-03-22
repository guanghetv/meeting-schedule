const config = require('./config')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// 将 Hot-reload 相对路径添加到 webpack.base.conf 的 对应 entry 前
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = function (_env) {
    return merge(baseWebpackConfig, {
    devtool: '#cheap-module-eval-source-map',

    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env,
            NODE_ENV: JSON.stringify(_env)
        }),
        new ExtractTextPlugin({ 
            filename: '[name].[hash].css', 
            disable: false, 
            allChunks: true 
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            inject: true
        }),
        new FriendlyErrorsPlugin()
    ]
})
}