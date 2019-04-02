const models = require('../models');

exports.filterByDistrict = (req, res, next) => {
	let district = req.query.district;
	models.restaurants
		.findAll({
			where: { district: district }
		})
		.then((result) => {
			res.status(200).send(JSON.stringify(result));
		})
		.catch((err) => {
			res.status(500).send(err);
		});
};
