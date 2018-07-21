import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import Contactdata from './Contactdata/Contactdata';

import { connect } from 'react-redux';

class Checkout extends Component {

    checkoutCancelledhandler = () => {
        this.props.history.goBack();
    }
    checkoutContinuedhandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }


    render() {
        return (
            <div>
                <CheckoutSummary
                    checkoutCancelled={this.checkoutCancelledhandler}
                    checkoutContinued={this.checkoutContinuedhandler}
                    ingredients={this.props.ings}>
                </CheckoutSummary>
                <Route
                    path={this.props.match.path + '/contact-data'}
                    component={Contactdata}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
};

export default connect(mapStateToProps, null)(Checkout);