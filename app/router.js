'use strict';
const router = require('koa-router')()
const MeetingController = require('./controller/meeting')
const StateController = require('./controller/state')

router.get('/meeting/all-meeting-room', MeetingController.getAll)
router.get('/state/meeting-state/room/:meetingRoomId', StateController.getOneAll)
router.delete('/state/meeting-state/room/:roomId/state/:stateId', StateController.deleteOne)
router.put('/state/meeting-state', StateController.updateOne)

module.exports = router
