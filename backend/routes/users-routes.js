const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const usersControllers = require("../controllers/users-controllers");

// 사용자 리스트 조회
router.get("/", usersControllers.getUsers);

// 신규 사용자 등록
router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").isEmail(),
    check("password").isLength({ min: 5 }),
  ],
  usersControllers.signupUser
);

// 로그인 요청
router.post("/login", usersControllers.loginUser);

module.exports = router;
