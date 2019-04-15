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
	getReviewOfTheDay: async (req, res, next) => {
		let todayMidnight = new Date();
		todayMidnight.setHours(0, 0, 0, 0);
		let reviewList = await models.reviews.findAll({
			where: {
				createdAt: {
					[Op.gte]: todayMidnight
				}
			},
			include: [
				{
					model: models.users,
					attributes: [ 'name', 'profilePhoto' ]
				},
				{
					model: models.restaurants,
					attributes: [ 'name' ]
				}
			]
		});

		let reveiwOfTheDay = reviewList.reduce(pickTheReviewOfTheDay);

		let restaurantID = reveiwOfTheDay['restaurantID'];

		let ratingList = await models.reviews.findAll({
			attributes: [ 'rating' ],
			where: {
				restaurantID: restaurantID
			}
		});

		let sum = 0;
		for (let i = 0; i < ratingList.length; i++) {
			sum += ratingList[i]['rating'];
		}

		let averageRating = { averageRating: sum / ratingList.length };
		Object.assign(reveiwOfTheDay.dataValues, averageRating);
		// console.log('reviewOfTheDay::: ', reveiwOfTheDay);
		res.send(reveiwOfTheDay);
	},
	insertReview: (req, res, next) => {
		// console.log('body::::: ', req.body);
		if (req.body.restaurantID && req.body.userID) {
			models.reviews
				.create(req.body)
				.then((result) => res.send('Successfully archived!'))
				.catch((err) => res.send(err));
		}
	}
};
