const path = require('path');

module.exports = {
    build: {
        //  存放文件根目录
        assetsRoot: path.resolve(__dirname, '../../dist/'),
        //  构建后文件存放目录
        assetsSubDirectory: 'assets',
        //  构建的根目录
        assetsPublicPath: './',
        env: '"production"'
    },
    dev: {
        //  端口号
        port: 8006,
        //  是否自动打开浏览器
        autoOpenBrowser: true,
        assetsSubDirectory: 'assets',
        assetsPublicPath: '/',
        env: '"development"'
    }
}