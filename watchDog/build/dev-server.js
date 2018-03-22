//  获取node参数
var _env = process.argv.splice(2)[0] || 'development'

//  读取配置文件
var config = require('./config');
//  打开刘游览器所需要的
var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')(_env)

//  确认端口和是否打开浏览器
var port = config.dev.port
var autoOpenBrowser = !!config.dev.autoOpenBrowser

var app = express()

var compiler = webpack(webpackConfig);

//  热加载
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})

//  模板更新后重新加载
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

//  支持 html5 history API
app.use(require('connect-history-api-fallback')())

//  加载-热加载
app.use(devMiddleware)

app.use(hotMiddleware)

//  静态资源存放地址
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

//  开启服务时候显示地址
var uri = 'http://localhost:' + port

devMiddleware.waitUntilValid(function () {
  console.log('> Listening at ' + uri + '\n')
})

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }

  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})