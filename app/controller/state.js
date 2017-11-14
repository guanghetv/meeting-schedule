'use strict';

const pool = require('../../config/db')
const config = require('../../config/config.default')
class StateController {
  static async getOneAll() {
    this.ctx.body = 'hi, egg';
    const { rows } = await pool.query(`select * from meeting_room`)
    console.log(rows)
  }
  static async deleteOne() {

  }
  static async updateOne() {

  }
}

module.exports = StateController;
