'use strict';
const moment = require('moment')
const assert = require('http-assert')
const pool = require('../../config/db')
const config = require('../../config/config.default')
class StateController {
  static async getOneAll(ctx) {
    const { roomId } = ctx.params
    const { rows } = await pool.query(`
        select id, description, "timeRange", "roomId", "day" from meeting_schedule where "roomId" = $1
    `, [ roomId ])
    rows.map(row => {
        const showTime = processRangeTimeToObject(row.timeRange)
        row.beginTime = showTime.beginTime
        row.endTime = showTime.endTime
        row.day = moment(row.day).format('YYYY-MM-DD')
        delete row.timeRange
        return row
    })
    ctx.body = { roomId, data: rows }
  }
  static async deleteOne(ctx) {
    const { stateId, roomId } = ctx.params
    await pool.query(`
        delete from meeting_schedule where id = $1
    `, [ stateId ])
    ctx.status = 204
    const canOrderRange = currentWeekBeginAndNextWeekEnd()
    const { rows } = await pool.query(`
        select * from meeting_schedule
            where day >= '${canOrderRange.beginTime.format('YYYY-MM-DD 00:00')}'
            and day <= '${canOrderRange.endTime.format('YYYY-MM-DD 23:59')}'
            and "roomId" = $1
    `, [ roomId ])
    rows.map(row => {
        const showTime = processRangeTimeToObject(row.timeRange)
        row.beginTime = showTime.beginTime
        row.endTime = showTime.endTime
        row.day = moment(row.day).format('YYYY-MM-DD')
        row.roomId = roomId
        delete row.timeRange
        return row
    })
    global.io.sockets && global.io.sockets.emit('roomStates', { roomId, data: rows })
  }
  static async updateOne(ctx) {
    let { beginTime, endTime, description, day, id, userId = 'xxx', roomId } = ctx.request.body
    assert(`${new Date(beginTime)}` !== 'Invalid Date', 400, '请传合法的时间字符串')
    assert(`${new Date(endTime)}` !== 'Invalid Date', 400, '请传合法的时间字符串')
    assert(`${new Date(day)}` !== 'Invalid Date', 400, '请传合法的时间字符串')
    assert(roomId, 400, '需要有roomId')
    assert(description, 400, '需要设置会议用途')
    assert(day, 400, '需要设置预定哪一天的会议室')
    beginTime = formatSecond(beginTime)
    endTime = formatSecond(endTime)
    day = formatDay(day)
    assert(moment(endTime) > moment(beginTime), 400, '结束时间应该大于开始时间')
    assert(formatDay(beginTime) === formatDay(endTime), 400, '起止时间应该是同一天')
    assert(moment(beginTime).hour() < 19 && moment(beginTime).hour() > 9, 400, '开始时间应该在9:00-19:00间')
    assert(moment(endTime).hour() < 19 && moment(endTime).hour() > 9, 400, '开始时间应该在9:00-19:00间')
    assert(new Date(day) >= new Date(moment().format('YYYY-MM-DD')), 400, '请不要预定今天之前的会议室')
    const canOrderRange = currentWeekBeginAndNextWeekEnd()
    // assert(moment(day) > canOrderRange.beginTime, 400, '日期太靠前了，请预定本周和下周')
    assert(moment(day) < canOrderRange.endTime, 400, '日期太靠后了，请预定本周和下周')
    let result = null
    if (id) {
        result = await pool.query(`
            select * from meeting_schedule
            where day = $1 and "roomId" = $2 and "timeRange" @> $3::timestamptz and id != $4
        `, [ day, roomId, beginTime, id ])
    } else {
        result = await pool.query(`
            select * from meeting_schedule
            where day = $1 and "roomId" = $2 and "timeRange" @> $3::timestamptz
        `, [ day, roomId, beginTime ])
    }
    assert(result.rows.length === 0, 400, '开始时间设置的有冲突')
    // if (id) {
    //     result = await pool.query(`
    //         select * from meeting_schedule
    //         where day = $1 and "timeRange" @> $2::timestamptz and id != $3
    //     `, [ day, endTime, id ])
    // } else {
    //     result = await pool.query(`
    //     select * from meeting_schedule
    //     where day = $1 and "timeRange" @> $2::timestamptz
    // `, [ day, endTime ])
    // }
    // console.log(result.rows)
    // assert(result.rows.length === 0, 400, '结束时间设置的有冲突')
    const timeRange = createTimeRange(beginTime, endTime)
    if (id) {
        await pool.query(`
            update meeting_schedule
            set "timeRange" = $1, description = $2, day = $3, "userId" = $4, "roomId" = $5
            where id = $6
        `, [ timeRange, description, moment(day).format('YYYY-MM-DD 00:00:00'), userId, roomId, id ])
        ctx.status = 204
    } else {
        const { rows } = await pool.query(`
            insert into meeting_schedule ("timeRange", "day", "userId", "description", "roomId")
            values ($1, $2, $3, $4, $5) returning id
        `, [ timeRange, moment(day).format('YYYY-MM-DD 00:00:00'), userId, description, roomId ])
        ctx.body = rows[0].id
    }
    const { rows } = await pool.query(`
        select * from meeting_schedule
            where day >= '${canOrderRange.beginTime.format('YYYY-MM-DD 00:00')}'
            and day <= '${canOrderRange.endTime.format('YYYY-MM-DD 23:59')}'
            and "roomId" = $1
    `, [ roomId ])
    rows.map(row => {
        const showTime = processRangeTimeToObject(row.timeRange)
        row.beginTime = showTime.beginTime
        row.endTime = showTime.endTime
        row.day = moment(row.day).format('YYYY-MM-DD')
        row.roomId = roomId
        delete row.timeRange
        return row
    })
    global.io.sockets && global.io.sockets.emit('roomStates', { roomId, data: rows })
  }
}

function createTimeRange(beginTime, endTime) {
    return `[${formatSecond(beginTime)}, ${formatSecond(endTime)})`
}

function formatDay(time) {
    return moment(time).format('YYYY-MM-DD')
}

function formatSecond(time) {
    return moment(time).format('YYYY-MM-DD HH:mm:ss')
}

function currentWeekBeginAndNextWeekEnd() {
    const today = moment().day()
    const beginTime = moment(moment().add(0 - (today || 7) + 1, 'days').format('YYYY-MM-DD 00:00:00')) // 因为周日的today是0不是7，所以使用(today || 7)
    const endTime = moment(moment().add(7 - (today || 7) + 7, 'days').format('YYYY-MM-DD 23:59:59'))
    return { beginTime, endTime }
}

function processRangeTimeToObject(rangeTimeStr) {
    const result = {}
    if (rangeTimeStr) {
        rangeTimeStr.replace(/\"(.+?)\"/ig, (origin, dest, index) => {
            if (!result.beginTime) {
                result.beginTime = dest
            } else {
                result.endTime = dest
            }
        })
    }
    return result
}

module.exports = StateController;
