module.exports = (sequelize, DataTypes) => {
	const users = sequelize.define('users', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(45),
			allowNull: false
		},
		email: {
			type: DataTypes.STRING(100),
			allowNull: false
		},
		pw: {
			type: DataTypes.STRING(100),
			allowNull: false
		},
		profilePhoto: {
			type: DataTypes.STRING(200),
			allowNull: true
		}
	});
	users.associate = function(models) {
		models.users.hasMany(models.reviews, {
			foreignKey: 'userID',
			constraints: false
		});
		models.reviews.belongsTo(models.users, {
			foreignKey: 'userID',
			constraints: false
		});
	};
	return users;
};
