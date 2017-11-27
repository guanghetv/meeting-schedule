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
            type = $3,
            devices = $4,
            place = $5,
            "peopleCount" = $6
        where id = $7
    `, [ room.name, room.description, room.type, room.devices, room.place, room.peopleCount, room.id ])
    console.log('update one')
}

async function createRoom(room) {
    await pool.query(`
        insert into meeting_room (name, description, type, devices, place, "peopleCount") values
        ($1, $2, $3, $4, $5, $6)
    `, [ room.name, room.description, room.type, room.devices, room.place, room.propleCount ])
    console.log('insert one')
}

cuMeetingRooms()