const express = require('express');

const router = express.Router();

const placesControllers = require('../controllers/places-controllers');

// 장소ID에 해당하는 장소정보를 반환
router.get('/:pid', placesControllers.getPlaceById);

// 작성자ID가 등록한 장소를 반환
router.get('/user/:uid', placesControllers.getPlaceByUserId);

// 장소 추가 
router.post('/', placesControllers.createPlace);

module.exports = router;