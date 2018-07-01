import React, { Component } from 'react';
import Aux from '../../hoc/Auxi';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    sideDrawerClosehandler = () => {
        this.setState({
            showSideDrawer: false
        });
    }
    toggleDrawerOpenhandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        });
    }
    render() {
        return (
            <Aux>
                <Toolbar clickMenu={this.toggleDrawerOpenhandler}></Toolbar>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosehandler}></SideDrawer>
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;