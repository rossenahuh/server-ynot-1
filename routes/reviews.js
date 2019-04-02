const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviews');

router.get('/reviewoftheday', reviewsController.getReviewOfTheDay);
router.get('/averageRating', reviewsController.getAverageRatingOfTheRestaurant);
router.post('/', reviewsController.insertReview);
module.exports = router;
