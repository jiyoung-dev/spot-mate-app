const { v4: uuid } = require("uuid");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");
const User = require("../models/user");

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

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    return next(
      new HttpError("Signing up failed, please try again later! ", 500)
    );
  }

  const createdUser = new User({
    id: uuid(),
    email,
    name,
    password: hashedPassword,
  });

  try {
    await createdUser.save();
  } catch (error) {
    return next(
      new HttpError("Signing up failed, please try again later... ", 500)
    );
  }

  let token;
  try {
    // 토큰 생성함수
    token = jwt.sign(
      {
        userId: createdUser.id,
        email: createdUser.email,
      },
      "secrete_key",
      { expiresIn: "1h" }
    );
  } catch (error) {
    return next(
      new HttpError("Signing up failed, please try again later! ", 500)
    );
  }

  res
    .status(201)
    .json({ userId: createdUser.id, email: createdUser.email, token: token });
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
  if (!existingUser) {
    return next(
      new HttpError("존재하지 않는 아이디 또는 비밀번호 오류입니다.", 401)
    );
  }

  // user는 존재하는데, 비밀번호가 일치하지 않은경우
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (error) {
    return next(
      new HttpError("Signing up failed, please try again later! ", 500)
    );
  }

  if (!isValidPassword) {
    return next(
      new HttpError("존재하지 않는 아이디 또는 비밀번호 오류입니다.", 401)
    );
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
      },
      "secrete_key",
      { expiresIn: "1h" }
    );
  } catch (error) {
    return next(
      new HttpError("Signing up failed, please try again later! ", 500)
    );
  }

  res.status(201).json({
    message: "login succeeded",
    userId: existingUser.id,
    email: existingUser.email,
    token: token,
  });
};

exports.getUsers = getUsers;
exports.signupUser = signupUser;
exports.loginUser = loginUser;
