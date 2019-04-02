const models = require('../models');

module.exports = {
	getTop9recentlyCreated: (req, res, next) => {
		models.reviews
			.findAll({
				attributes: [ 'rating', 'comment' ],
				include: [
					{
						model: models.users,
						attributes: [ 'name', 'profilePhoto' ]
					},
					{
						model: models.restaurants,
						attributes: [ 'name' ]
					}
				],
				//날짜 최신순으로 9개 뽑아오는 logic
				order: [ [ 'id', 'DESC' ] ],
				limit: 9
			})
			.then((list) => res.json(list))
			.catch((err) => res.send(err));
	}
};
