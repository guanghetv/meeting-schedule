const config = require('./config.default')
const { Pool } = require('pg')
const pool = new Pool(config.db)
module.exports = pool