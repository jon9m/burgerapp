import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import Contactdata from './Contactdata/Contactdata';

class Checkout extends Component {
    state = {
        ingredients: null,
        price: 0
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price = +param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({
            ingredients: ingredients,
            totalPrice: price
        });
    }

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
                    ingredients={this.state.ingredients}>
                </CheckoutSummary>
                <Route path={this.props.match.path + '/contact-data'}
                    render={(props) => (<Contactdata ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}></Contactdata>)}></Route>
            </div>
        );
    }
}

export default Checkout;