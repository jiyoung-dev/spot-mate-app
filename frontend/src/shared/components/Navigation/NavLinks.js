import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';

const NavLinks = (props) => {
    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/" exact>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/:uid/places">My Places</NavLink>
            </li>
            <li>
                <NavLink to="/places/new">New</NavLink>
            </li>
            <li>
                <NavLink to="/auth">Login</NavLink>
            </li>
        </ul>
    );
};

export default NavLinks;
