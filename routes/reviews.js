const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviews');

router.get('/reviewoftheday', reviewsController.getReviewOfTheDay);
module.exports = router;
