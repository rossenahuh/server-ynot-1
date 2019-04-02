module.exports = (sequelize, DataTypes) => {
	console.log('restauants table::: ', 'deifined');
	const restaurants = sequelize.define('restaurants', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(30),
			allowNull: false
		},
		address: {
			type: DataTypes.STRING(100),
			allowNull: false
		},
		district: {
			type: DataTypes.STRING(20),
			allowNull: false
		},
		contact: {
			type: DataTypes.STRING(40),
			allowNull: true
		},
		src: {
			type: DataTypes.STRING(150),
			allowNull: true
		}
	});
	restaurants.associate = function(models) {
		console.log('reviews::: ', models.reviews);
		//restaurants.~ 하게되면 생성중인 table에 associate을 적용하게 되어 FK삽입이 안됨
		models.restaurants.hasMany(models.reviews, {
			foreignKey: 'restaurantID',
			constraints: false
		});
		models.reviews.belongsTo(models.restaurants, {
			foreignKey: 'restaurantID',
			constraints: false
		});
	};
	return restaurants;
};
