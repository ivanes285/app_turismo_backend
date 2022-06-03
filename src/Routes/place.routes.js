const router = require('express').Router()
const {getPlaces,createPlace,updatePlace,deletePlace} = require('../Controllers/placeController')
const auth = require('../Middlewares/auth')


router.route('/places').get(getPlaces).post(createPlace)


router.route('/places/:id').delete(deletePlace).put(updatePlace)