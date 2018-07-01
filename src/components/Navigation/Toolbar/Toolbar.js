import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../../components/Logo/Logo';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems';

const toolbar = (props) => (
    <header className={classes.toolbar}>
        <div onClick={props.clickMenu} className={classes.DrawerToggle}>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div className={classes.Logo}>
            <Logo></Logo>
        </div>
        <nav className={classes.desktopOnly}>
            <NavigationItems></NavigationItems>
        </nav>
    </header>
)

export default toolbar;