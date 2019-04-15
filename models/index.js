const Sequelize = require('sequelize');
const db = {};
const config = require('../config/config.json');
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
console.log('sequlize::: ', 'triggered');

const sequelize = new Sequelize(config.database, config.username, config.password, {
	host: config.host,
	dialect: config.dialect,
	port: config.port,
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	}
});

sequelize.sync({ force: true });

// sequelize.sync();

fs
	.readdirSync(__dirname)
	.filter((file) => {
		return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
	})
	.forEach((file) => {
		const model = sequelize['import'](path.join(__dirname, file));
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.sequelize = sequelize;

module.exports = db;
