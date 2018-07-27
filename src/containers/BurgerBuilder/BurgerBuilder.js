import React, { Component } from 'react';
import Aux from '../../hoc/Auxi';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler';   //Note lowercase - not used in JSX

import { connect } from 'react-redux';

import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component {

    state = {
        purchasing: false
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePerchaseState(ingredients) {
        const sum = Object.keys(ingredients).map((key) => {
            return ingredients[key];
        }).reduce((currSum, el) => {
            return currSum + el;
        }, 0);

        return (sum > 0) ? true : false;
    }

    purchasehandler = () => {
        this.setState({
            purchasing: true
        });
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        });
    }

    purchaseContinueHandler = () => {
        this.props.history.push({
            pathname: '/checkout'
        });
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = (this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner></Spinner>);
        if (this.props.ings !== null) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}></Burger>
                    <BuildControls
                        purchasing={this.purchasehandler}
                        purchasable={this.updatePerchaseState(this.props.ings)}
                        price={this.props.price}
                        disabled={disabledInfo}
                        ingredientAdded={this.props.onIngredientAdd}
                        ingredientRemoved={this.props.onIngredientRemoved}>
                    </BuildControls>
                </Aux>
            );
            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ings}
                    purchaseCancel={this.purchaseCancelHandler}
                    purchaseContinue={this.purchaseContinueHandler}
                    totalPrice={this.props.price}>
                </OrderSummary>
            );
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <div>
                    {burger}
                </div>
                <div>

                </div>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilderReducer.ingredients,
        price: state.burgerBuilderReducer.totalPrice,
        error: state.burgerBuilderReducer.error
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdd: (ingName) => (dispatch(burgerBuilderActions.addIngredient(ingName))),
        onIngredientRemoved: (ingName) => (dispatch(burgerBuilderActions.removeIngredient(ingName))),
        onInitIngredients: () => {dispatch(burgerBuilderActions.initIngredient())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));