import React from 'react';
import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import Backdrop from '../UIElements/Backdrop';
import SideDrawer from './SideDrawer';
import './MainNavigation.css';

const MainNavigation = (props) => {
    const [drawerIsOpen, setDrawerIsOpen] = React.useState(false);

    const openDrawer = () => {
        setDrawerIsOpen(true);
    };

    const closeDrawer = () => {
        setDrawerIsOpen(false);
    };

    return (
        <>
            {drawerIsOpen ? <Backdrop onClick={closeDrawer} /> : null}
            {drawerIsOpen ? (
                <SideDrawer>
                    <nav className="main-navigation__drawer-nav">
                        <NavLinks />
                    </nav>
                </SideDrawer>
            ) : null}
            <MainHeader>
                <button
                    className="main-navigation__menu-btn"
                    onClick={openDrawer}>
                    <span />
                    <span />
                    <span />
                </button>
                <h1 className="main-navigation__title">
                    <Link to="/">Spot Mate</Link>
                </h1>
                <nav className="main-navigation__header-nav">
                    <NavLinks />
                </nav>
            </MainHeader>
        </>
    );
};

export default MainNavigation;
