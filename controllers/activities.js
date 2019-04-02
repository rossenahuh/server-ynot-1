const models = require('../models');
const Sequelize = require('sequelize');

module.exports = {
	getNRecentlyCreated: (req, res, next) => {
		var number = req.query.howmany;
		console.log('getNRecentlyCreated::: ', number);
		res.send('hi');
	}
};

// var _q = Table;
// _q.findAll({
// attributes: [['fields', 'fields']],
// order: [['id' ,'DESC']],limit: 1,
// });
