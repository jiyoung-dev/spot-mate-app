const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const placesControllers = require("../controllers/places-controllers");

// 장소ID에 해당하는 장소정보를 반환
router.get("/:pid", placesControllers.getPlaceById);

// 작성자ID가 등록한 장소를 반환
router.get("/user/:uid", placesControllers.getPlacesByUserId);

// 장소 추가
router.post(
  "/",
  // 유효성검사 미들웨어 등록
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  placesControllers.createPlace
);
// 장소명(title)이 비어있지(isEmpty) 않도록(not) 확인(check) 하는 미들웨어가됨! -> 한문장으로 무슨역할을 하는지 읽힌다.👍

// 장소 수정
router.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  placesControllers.updatePlace
);

// 장소 삭제
router.delete("/:pid", placesControllers.deletePlace);

module.exports = router;
