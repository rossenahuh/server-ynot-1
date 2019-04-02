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
	}
};
