import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from 'src/shared/context/auth-context';
import './NavLinks.css';

const NavLinks = (props) => {
    const auth = useContext(AuthContext); // 수신받는 컨택스트를 사용해보자

    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/" exact>
                    Home
                </NavLink>
            </li>
            {auth.isLoggedIn && (
                <li>
                    <NavLink to="/:uid/places">My Places</NavLink>
                </li>
            )}
            {auth.isLoggedIn && (
                <li>
                    <NavLink to="/places/new">New</NavLink>
                </li>
            )}
            {!auth.isLoggedIn && (
                <li>
                    <NavLink to="/auth">Login</NavLink>
                </li>
            )}
        </ul>
    );
};

export default NavLinks;
