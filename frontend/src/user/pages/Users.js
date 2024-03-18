import React from 'react';

import { USERS } from 'src/_mock/user';
import UsersList from '../components/UsersList';

const Users = () => {
    return <UsersList items={USERS} />;
};

export default Users;
