'use strict';

const pool = require('../../config/db')
const config = require('../../config/config.default')
class MeetingController {
  static async getAll(ctx) {
    const { rows } = await pool.query(`
      select * from meeting_room
    `)
    ctx.body = rows
    // global.socket.emit('meetings', rows)
  }  
}

module.exports = MeetingController;
