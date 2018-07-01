import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../../components/Logo/Logo';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems';

const toolbar = (props) => (
    <header className={classes.toolbar}>
        <div>MENU</div>
        <Logo></Logo>
        <nav>
            <NavigationItems></NavigationItems>
        </nav>
    </header>
)

export default toolbar;