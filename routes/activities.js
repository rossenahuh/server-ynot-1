const express = require('express');
const router = express.Router();
const activitiesController = require('../controllers/activities');

router.get('/recentlyCreated', activitiesController.getTop9recentlyCreated);
module.exports = router;
