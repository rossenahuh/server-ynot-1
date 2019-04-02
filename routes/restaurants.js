const express = require('express');
const router = express.Router();
const restaurantsController = require('../controllers/restaurants');

router.get('/infoabout', restaurantsController.getInfoOfTheRestaurant);
router.get('/nearby', restaurantsController.getNearbyRestaurnats);

module.exports = router;
