import React from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from 'src/shared/context/auth-context';
import './NavLinks.css';

const NavLinks = (props) => {
    const auth = React.useContext(AuthContext);

    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/" exact>
                    Home
                </NavLink>
            </li>
            {auth.isLoggedIn && (
                <li>
                    <NavLink to={`/${auth.userId}/places`}>My Places</NavLink>
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
            {auth.isLoggedIn && (
                <li>
                    {/* <NavLink to="/">Logout</NavLink> */}
                    <button onClick={auth.logout}>Logout</button>
                </li>
            )}
        </ul>
    );
};

export default NavLinks;
