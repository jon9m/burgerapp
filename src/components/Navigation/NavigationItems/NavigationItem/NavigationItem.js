import React from 'react';
import classes from './NavigationItem.css';

const navigationItem = (props) => (
    <li className={classes.navigationItem}>
        <a href={props.navlocation} className={props.active ? classes.active : null}>{props.children}</a>
    </li>
);
export default navigationItem;