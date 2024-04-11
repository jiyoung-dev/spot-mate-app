const { v4: uuid } = require('uuid');

const HttpError = require('../models/http-error');

const DUMMY_USERS = [
    {
        id: 'u1',
        email: 'test@test.com',
        name: 'Jenny',
        password: 'test123',
    },
];

const getUsers = (req, res, next) => {

    res.json({ users: DUMMY_USERS });
}

const signupUser = (req, res, next) => {
    const { email, name, password } = req.body;
    const createdUser = {
        id: uuid(),
        email,
        name,
        password
    }

    // 이미 존재하는 유저의 경우, 중복가입 방지 
    if (DUMMY_USERS.find(user => user.email === email)) {
        throw new HttpError('이미 사용중인 이메일입니다!', 401);
    }

    DUMMY_USERS.push(createdUser);

    res.status(201).json({ user: createdUser });
}

const loginUser = (req, res, next) => {
    const { email, password } = req.body;

    // 유저리스트에 존재하는 id 만 로그인 허용 
    const identifiedUser = DUMMY_USERS.find(user => user.email === email);

    if (!identifiedUser || identifiedUser.password !== password) {
        throw new HttpError('Could not identify user', 401);
    }
    // user는 존재하는데, 비밀번호가 일치하지 않은경우 
    res.status(201).json({ loggedUser: identifiedUser });
}

exports.getUsers = getUsers;
exports.signupUser = signupUser;
exports.loginUser = loginUser;