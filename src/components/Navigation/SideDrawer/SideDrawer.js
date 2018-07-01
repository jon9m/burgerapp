import React from 'react';
import Logo from '../../../components/Logo/Logo';
import NavigationItems from '../../../components/Navigation/NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import BackDrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxi';

const sideDrawer = (props) => {
    let attachClasses = [classes.sideDrawer, classes.close];
    if (props.open) {
        attachClasses = [classes.sideDrawer, classes.Open];
    }

    return (
        <Aux>
            <BackDrop show={props.open} clickedbackdrop={props.closed}></BackDrop>
            <div className={attachClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo></Logo>
                </div>
                <nav>
                    <NavigationItems></NavigationItems>
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;