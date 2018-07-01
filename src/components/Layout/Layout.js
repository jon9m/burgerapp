import React from 'react';
import Aux from '../../hoc/Auxi';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

const layout = (props) => (
    <Aux>
        <Toolbar></Toolbar>
        Toolbar, SideDrawer, Backdrop
        <main className={classes.content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;