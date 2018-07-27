import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
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
        let summary = <Redirect to="/" />;
        if (this.props.ings) {
            summary = (
                <div>
                    <CheckoutSummary
                        checkoutCancelled={this.checkoutCancelledhandler}
                        checkoutContinued={this.checkoutContinuedhandler}
                        ingredients={this.props.ings}>
                    </CheckoutSummary>
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={Contactdata}
                    /></div>
            );
        }

        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilderReducer.ingredients
    }
};

export default connect(mapStateToProps, null)(Checkout);