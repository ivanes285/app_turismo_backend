const router = require('express').Router()
const {getEvents,createEvent,updateEvent,deleteEvent} = require('../Controllers/eventController')
const auth = require('../Middlewares/auth')


router.route('/events').get(getEvents).post(createEvent)


router.route('/events/:id').delete(deleteEvent).put(updateEvent)

module.exports = router