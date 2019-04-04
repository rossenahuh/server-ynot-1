const models = require('../models');

module.exports = {
	getInfoOfTheRestaurant: async (req, res, next) => {
		//레스토랑이름, 연락처, 주소, 대표사진, 리뷰코멘트, 리뷰사진
		let restaurantInfo = await models.reviews.findOne({
			where: {
				restaurantID: req.query.id
			},
			include: [
				{
					model: models.restaurants
				},
				{
					model: models.users,
					attributes: [ 'id', 'name', 'profilePhoto', 'createdAt' ]
				}
			]
		});

		let restaurantID = restaurantInfo['restaurantID'];

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
		Object.assign(restaurantInfo.dataValues, averageRating);
		res.json(restaurantInfo);
	},
	getNearbyRestaurnats: async (req, res, next) => {
		let restaurantList = await models.restaurants.findAll({
			where: {
				district: req.query.district
			}
		});

		let result = [];

		// restaurantList.forEach((element) => {
		// 	result.push(element);
		// });

		for (let restaurant of restaurantList) {
			let ratingList = await models.reviews.findAll({
				attributes: [ 'rating' ],
				where: {
					restaurantID: restaurant['id']
				}
			});

			let sum = 0;
			for (let i = 0; i < ratingList.length; i++) {
				sum += ratingList[i]['rating'];
			}

			let averageRating = { averageRating: sum / ratingList.length };
			Object.assign(restaurant.dataValues, averageRating);
			result.push(restaurant);
		}
		res.json(result);
	}
};
