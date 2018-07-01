import React from 'react';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = (props) => (
    <ul className={classes.navigationItems}>
        <NavigationItem navlocation="/" active="true">Burger Builder</NavigationItem>
        <NavigationItem navlocation="/" >Checkout Page</NavigationItem>
    </ul>
);
export default navigationItems;