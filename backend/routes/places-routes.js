const express = require('express');
const HttpError = require('../models/http-error');

const router = express.Router();

const DUMMY_PLACES = [
	{
		id: 'p1',
		title: 'Empire State Building',
		description: 'One of the most famous sky scrapers in the world!',
		location: {
			lat: 40.7484474,
			lng: -73.9871516,
		},
		address: '20 W 34th St, New York, NY 10001',
		creator: 'u1',
	},
];

// 장소ID에 해당하는 장소정보를 반환
router.get('/:pid', (req, res, next) => {
	const placeId = req.params.pid;
	const place = DUMMY_PLACES.find(p => {
		return p.id === placeId;
	});

	if (!place) {
		// const error = new Error('Could not find a place for the provided id.');
		// error.code = 404;
		// return next(error);
		throw new HttpError('Could not find a place for the provided id.', 404);
	}

	res.json({ place }); // => { place } => { place: place }
});

// 작성자ID가 등록한 장소를 반환
router.get('/user/:uid', (req, res, next) => {
	const userId = req.params.uid;
	const place = DUMMY_PLACES.find(p => {
		return p.creator === userId;
	});

	if (!place) {
		throw new HttpError(
			'Could not find a place for the provided user id.',
			404
		);
	}

	res.json({ place });
});

module.exports = router;
