import React from 'react';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = (props) => (
    <ul className={classes.navigationItems}>
        {/*<NavigationItem navlocation="/" active="true">Burger Builder</NavigationItem>*/}
        <NavigationItem exactproperty navlocation="/">Burger Builder</NavigationItem>
        <NavigationItem navlocation="/orders" >Orders</NavigationItem>
        {
            (!props.isAuthenticated) ? <NavigationItem navlocation="/auth" >Login</NavigationItem> : <NavigationItem navlocation="/logout" >Logout</NavigationItem>
        }
    </ul>
);
export default navigationItems;