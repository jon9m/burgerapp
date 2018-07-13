import React from 'react';
import classes from './NavigationItem.css';
import { NavLink } from 'react-router-dom';

const navigationItem = (props) => (
    <li className={classes.navigationItem}>
        {/*<a href={props.navlocation} className={props.active ? classes.active : null}>{props.children}</a>*/}
        <NavLink to={props.navlocation} exact={props.exactproperty} activeClassName={classes.active}>{props.children}</NavLink>
    </li>
);
export default navigationItem;