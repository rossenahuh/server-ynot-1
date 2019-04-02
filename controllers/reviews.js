const models = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

let pickTheReviewOfTheDay = (acc, cur) => {
	if (acc.rating > cur.rating) {
		return acc;
	} else if (acc.rating === cur.rating) {
		return acc.comment.length > cur.comment.length ? acc : cur;
	} else {
		return cur;
	}
};

module.exports = {
	getReviewOfTheDay: (req, res, next) => {
		let todayMidnight = new Date();
		todayMidnight.setHours(0, 0, 0, 0);
		models.reviews
			.findAll({
				attributes: [ 'rating', 'comment' ],
				where: {
					createdAt: {
						[Op.gte]: todayMidnight
					}
				},
				include: [
					{
						model: models.users,
						attributes: [ 'name' ]
					}
				]
			})
			.then((reviews) => {
				let reveiwOfTheDay = reviews.reduce(pickTheReviewOfTheDay);
				res.json(reveiwOfTheDay);
			});
	},
	getAverageRatingOfTheRestaurant: async (req, res, next) => {
		let ratingList = await models.reviews.findAll({
			attributes: [ 'rating' ],
			where: {
				restaurantID: req.query.restaurantID
			}
		});

		let sum = 0;
		for (let i = 0; i < ratingList.length; i++) {
			sum += ratingList[i]['rating'];
		}

		let averageRating = sum / ratingList.length;

		res.json(averageRating);
	},
	insertReview: (req, res, next) => {
		models.reviews
			.create(req.body)
			.then((result) => res.send('Successfully archived!'))
			.catch((err) => res.send(err));
	}
};
