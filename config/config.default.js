'use strict';

const R = require('ramda')

const config = {
  
}

module.exports = R.merge(config, process.env.NODE_ENV === 'development' ? require('./config.dev') : require('./config.prod'))