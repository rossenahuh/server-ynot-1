const models = require('../models');

module.exports = {
	getInfoOfTheRestaurant: (req, res, next) => {
		//레스토랑이름, 연락처, 주소, 대표사진, 리뷰코멘트, 리뷰사진
		models.restaurants
			.findOne({
				attributes: [ 'name', 'address', 'contact', 'src' ],
				where: {
					id: req.query.id
				}
			})
			.then((restaurantInfo) => {
				res.json(restaurantInfo);
			})
			.catch((err) => res.send(err));
	},
	getNearbyRestaurnats: (req, res, next) => {
		models.restaurants
			.findAll({
				where: {
					district: req.query.district
				},
				include: [
					{
						model: models.reviews,
						attributes: [ 'comment', 'photo' ]
					}
				]
			})
			.then((restaurantInfo) => {
				res.json(restaurantInfo);
			})
			.catch((err) => res.send(err));
	}
};
