module.exports = (sequelize, DataTypes) => {
	const reviews = sequelize.define('reviews', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		rating: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		comment: {
			type: DataTypes.STRING(300),
			allowNull: false
		},
		photo: {
			type: DataTypes.STRING(150),
			allowNull: true
		}
	});
	reviews.associate = function(models) {
		// associations can be defined here
	};
	return reviews;
};
