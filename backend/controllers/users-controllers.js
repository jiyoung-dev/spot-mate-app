const { v4: uuid } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const User = require("../models/user");

const DUMMY_USERS = [
  {
    id: "u1",
    email: "test@test.com",
    name: "Jenny",
    password: "test123",
  },
];

const getUsers = async (req, res, next) => {
  let users;
  try {
    // 패스워드 필드를 제외한 채로 반환
    users = await User.find({}, "-password");
  } catch (error) {
    return next(
      new HttpError("Signing up failed, please try again later! ", 500)
    );
  }

  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signupUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { email, name, password } = req.body;

  // 이미 존재하는 유저의 경우, 중복가입 방지
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return next(
      new HttpError("Signing up failed, please try again later! ", 500)
    );
  }

  if (existingUser) {
    return next(new HttpError("이미 사용중인 이메일입니다!", 401));
  }

  const createdUser = new User({
    id: uuid(),
    email,
    name,
    password,
  });

  try {
    await createdUser.save();
  } catch (error) {
    return next(
      new HttpError("Signing up failed, please try again later... ", 500)
    );
  }

  res.status(201).json({ user: createdUser });
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return next(
      new HttpError("Signing up failed, please try again later! ", 500)
    );
  }

  // 유저리스트에 존재하는 id 만 로그인 허용
  if (!existingUser || existingUser.password !== password) {
    return next(
      new HttpError("존재하지 않는 아이디 또는 비밀번호 오류입니다.", 401)
    );
  }

  // user는 존재하는데, 비밀번호가 일치하지 않은경우
  res.status(201).json({ message: "login succeeded" });
};

exports.getUsers = getUsers;
exports.signupUser = signupUser;
exports.loginUser = loginUser;
