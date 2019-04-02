const models = require('../models');
const restaurantsData = require('../data/restaurants');
const usersData = require('../data/users');
const reviewsData = require('../data/reviews');

module.exports = async (req, res, next) => {
	let restaurantIDs = [];
	let userIDs = [];

	//inserting restaurant data into db
	let restaurantList = await models.restaurants.bulkCreate(restaurantsData, { returning: true });
	restaurantList.forEach((restaurant) => restaurantIDs.push(restaurant.id));

	//inserting user data into db
	let userList = await models.users.bulkCreate(usersData, { returning: true });
	userList.forEach((user) => userIDs.push(user.id));

	//manipulating reviewData with the given restID and userID
	for (let i = 0; i < reviewsData.length; i++) {
		let randomRestaurantID = Math.floor(Math.random() * restaurantIDs.length);
		let randomUserID = Math.floor(Math.random() * userIDs.length);
		reviewsData[i]['restaurantID'] = restaurantIDs[randomRestaurantID];
		reviewsData[i]['userID'] = userIDs[randomUserID];
	}

	//inserting review data into db
	let reviewList = await models.reviews.bulkCreate(reviewsData, { returning: true });

	res.json(reviewList);
};
