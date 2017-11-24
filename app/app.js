const Koa = require('koa')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const http = require('http')
const socket = require('socket.io')
const cors = require('kcors')
const router = require('./router')
const app = new Koa()

app.use(cors())
app.use(logger())
app.use(bodyParser())
app.use(router.routes())

const server = http.createServer(app.callback())

server.listen(process.env.NODE_PORT || 7002)


const io = new socket(server)

io.on('connection', function(socket){
    console.log('a user connected')
    if (!global.socket) {
        global.socket = socket
    }
})


console.log(`listen at ${process.env.NODE_PORT || 7002}`)
