const express = require('express');

const router = express.Router();

const placesControllers = require('../controllers/places-controllers');

// 장소ID에 해당하는 장소정보를 반환
router.get('/:pid', placesControllers.getPlaceById);

// 작성자ID가 등록한 장소를 반환
router.get('/user/:uid', placesControllers.getPlacesByUserId);

// 장소 추가 
router.post('/', placesControllers.createPlace);

// 장소 수정  
router.patch('/:pid', placesControllers.updatePlace);

// 장소 삭제 
router.delete('/:pid', placesControllers.deletePlace);

module.exports = router;