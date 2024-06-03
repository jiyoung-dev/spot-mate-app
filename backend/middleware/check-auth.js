const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");

// 수신받는 요청의 토큰 유효성검사를 처리
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    if (!token) {
      throw new Error("Authentication failed.");
    }
    const decodedToken = jwt.verify(token, "secrete_key");
    // 디코딩한 토큰에서 사용자정보 추출하기
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (error) {
    return next(new HttpError("Authentication failed!", 401));
  }
};
