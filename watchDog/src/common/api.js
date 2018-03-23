const domain = 'http://10.8.8.8:7010';

const APIs = {
    GET_ROOMS: '/meeting/all-meeting-room',
    GET_ROOM_ORDERS: '/state/meeting-state/room/', //  /state/meeting-state/room/:id
    DELETE_ROOM_STATUS: '/state/meeting-state/room/',
    PUT_ROOM_STATUS: '/state/meeting-state'
};

const addDomain = api => domain + api;

for (const key in APIs) {
    if (Object.prototype.hasOwnProperty.call(APIs, key)) {
        APIs[key] = addDomain(APIs[key])
    }
}

export default APIs;