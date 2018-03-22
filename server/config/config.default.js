'use strict';

const R = require('ramda')

const config = {
  oneDayMs: 86400000 // 一天的毫秒数
}

module.exports = R.merge(config, process.env.NODE_ENV === 'development' ? require('./config.dev') : require('./config.prod'))