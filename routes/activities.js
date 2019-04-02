const express = require('express');
const router = express.Router();
const activitiesController = require('../controllers/activities');

console.log('ActivityRouter::: ', 'triggered');
router.get('/recentlyCreated', activitiesController.getNRecentlyCreated);
module.exports = router;
