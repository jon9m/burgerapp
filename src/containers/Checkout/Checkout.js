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
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;

            summary = (
                <div>
                    {purchasedRedirect}
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
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilderReducer.ingredients,
        purchased: state.orderReducer.purchased
    }
};

export default connect(mapStateToProps, null)(Checkout);