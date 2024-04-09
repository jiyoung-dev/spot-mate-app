const DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Jenny',
        image: 'imageURL',
        places: 5,
    },
];

const getUsers = (req, res, next) => {
    const users = DUMMY_USERS;

    res.json({ users });
}

const signupUser = (req, res, next) => {
    const { id, name, image, places } = req.body;
    const createdUser = {
        id,
        name,
        image,
        places
    }

    DUMMY_USERS.push(createdUser);

    res.status(201).json({ user: createdUser });
}

const loginUser = (req, res, next) => {
    const loggedUserId = req.body.id;
    // 유저리스트에 존재하는 id 만 로그인 허용 
    const user = DUMMY_USERS.find(user => user.id === loggedUserId);

    if (!user) {
        res.status(404).json({ message: '일치하는 사용자가 없습니다.' });
    }
    res.status(201).json({ loggedUser: user });
}

exports.getUsers = getUsers;
exports.signupUser = signupUser;
exports.loginUser = loginUser;