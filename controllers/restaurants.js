const models = require('../models');

module.exports = {
	getInfoOfTheRestaurant: async (req, res, next) => {
		let restaurantInfo = await models.restaurants.findOne({
			where: {
				id: req.query.restaurantID
			}
		});

		let reviews = await models.reviews.findAll({
			where: {
				restaurantID: req.query.restaurantID
			},
			include: [
				{
					model: models.users,
					attributes: [ 'name', 'profilePhoto' ]
				}
			]
		});
		// console.log('resInfo::: ', restaurantInfo);
		// console.log('reviews::: ', reviews);

		let restaurantID = restaurantInfo['id'];

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

		let averageRating = ratingList.length ? { averageRating: sum / ratingList.length } : { averageRating: 0 };
		let reviewNum = { reviewNum: ratingList.length };
		let reviewList = { reviewList: reviews };
		Object.assign(restaurantInfo.dataValues, averageRating);
		Object.assign(restaurantInfo.dataValues, reviewNum);
		Object.assign(restaurantInfo.dataValues, reviewList);
		res.json(restaurantInfo);
	},
	getNearbyRestaurnats: async (req, res, next) => {
		let restaurantList = await models.restaurants.findAll({
			where: {
				district: req.query.district
			}
		});

		let result = [];

		for (let i = 0; i < restaurantList.length; i++) {
			let reviewList = await models.reviews.findAll({
				attributes: [ 'rating', 'comment' ],
				where: {
					restaurantID: restaurantList[i]['id']
				}
			});
			let sum = 0;
			for (let i = 0; i < reviewList.length; i++) {
				sum += reviewList[i]['rating'];
			}

			let latestComment = reviewList.length
				? { latestComment: reviewList[reviewList.length - 1]['comment'] }
				: { latestComment: '작성된 리뷰가 없습니다' };

			let reviewNum = { numberOfReviews: reviewList.length };
			let averageRating = reviewList.length ? { averageRating: sum / reviewList.length } : { averageRating: 0 };
			// console.log('averageRating::: ', averageRating);
			Object.assign(restaurantList[i].dataValues, averageRating);
			Object.assign(restaurantList[i].dataValues, reviewNum);
			Object.assign(restaurantList[i].dataValues, latestComment);
			result.push(restaurantList[i]);
		}
		res.json(result);
	}
};
