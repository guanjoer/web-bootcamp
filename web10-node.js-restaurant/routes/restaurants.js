const express = require('express');
const uuid = require('uuid');
const currentDate = new Date();


const restaurantData = require('../util/restaurants-data');

const router = express.Router();


router.get('/restaurants', function(req, res) {
	let order = req.query.order;
	let nextOrder = 'desc';
	
	if(order !== 'asc' && order !== 'desc') {
		order = 'asc';
	}

	if(order === 'desc') {
		nextOrder = 'asc';
	}

	const storedRestaurants = restaurantData.getStoredRestaurants();

	storedRestaurants.sort(function(resA, resB) {
		if(
			(order === 'desc' && resA.date < resB.date) || // 최신 날짜 순으로
			(order === 'asc' && resA.date > resB.date) // 오래 된 날짜 순으로
		) {
			return 1;
		}
		return -1;
	}); 

	const dataLength = storedRestaurants.length;
	res.render('restaurants', {
		restaurantsNumber: dataLength,
		restaurants: storedRestaurants,
		nextOrder: nextOrder
	});
});

router.get('/restaurants/:id', function(req, res) {
	const restaurantId = req.params.id;

	const storedRestaurants = restaurantData.getStoredRestaurants();

	for(const restaurant of storedRestaurants) {
		if(restaurantId === restaurant.id) {
			return res.render('restaurant-details', {
				restaurant: restaurant});
		}
	}
	res.status(404).render('404');
});

router.get('/recommend', function(req, res) {
	res.render('recommend');
});

router.post('/recommend', function(req, res) {
	const restaurant = req.body;
	restaurant.id = uuid.v4();

	const formattedDate = currentDate.toLocaleString('ko-KR', {
		timeZone: 'Asia/Seoul',
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit'
	  });
	restaurant.date = formattedDate;


	const storedRestaurants = restaurantData.getStoredRestaurants();

	storedRestaurants.push(restaurant);

	restaurantData.storeRestaurants(storedRestaurants);

	res.redirect('/confirm');
});



router.get('/confirm', function(req, res) {
	res.render('confirm');
});

module.exports = router;