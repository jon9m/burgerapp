import React, { Component } from 'react';
import Aux from '../../hoc/Auxi';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

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
                <Toolbar clickMenu={this.toggleDrawerOpenhandler} isAuthenticated={this.props.isAuthenticated}></Toolbar>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosehandler} isAuthenticated={this.props.isAuthenticated}></SideDrawer>
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.authReducer.token !== null
    }
}

export default connect(mapStateToProps, null)(Layout);