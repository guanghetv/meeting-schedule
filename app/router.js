'use strict';
const router = require('koa-router')()
const MeetingController = require('./controller/meeting')
const StateController = require('./controller/state')

router.get('/meeting/all-meeting-room', MeetingController.getAll)
router.get('/state/meeting-state/:meetingRoomId', StateController.getOneAll)
router.delete('/state/meeting-state/:stateId', StateController.deleteOne)
router.put('/state/meeting-state/:stateId', StateController.updateOne)

module.exports = router
