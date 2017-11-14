const Koa = require('koa')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const router = require('./router')
const app = new Koa()

app.use(logger())
app.use(bodyParser())
app.use(router.routes())

app.listen(process.env.NODE_PORT || 7002)

console.log(`listen at ${process.env.NODE_PORT || 7002}`)
