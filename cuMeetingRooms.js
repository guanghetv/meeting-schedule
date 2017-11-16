const { Pool } = require('pg')
const rooms = require('./meetingRooms')

const pool = new Pool({
    host: '10.8.8.8',
    user: 'meeting',
    password: 'lovemeeting?',
    port: 5432,
    max: 10,
    database: 'meeting',
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
})

async function cuMeetingRooms() {
    for (let i = 0, j = rooms.length; i < j; i++) {
        const room = rooms[i]
        if (room.id) {
            await updateRoom(room)
            continue
        }
        await createRoom(room)
    }
    pool.end()
}

async function updateRoom(room) {
    await pool.query(`
        update meeting_room set
            name = $1,
            description = $2,
            type = $3
        where id = $4
    `, [ room.name, room.description, room.type, room.id ])
    console.log('update one')
}

async function createRoom(room) {
    await pool.query(`
        insert into meeting_room (name, description, type) values
        ($1, $2, $3)
    `, [ room.name, room.description, room.type ])
    console.log('insert one')
}

cuMeetingRooms()