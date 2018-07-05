import React, { Component } from 'react';
import Aux from '../../hoc/Auxi';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler';   //Note lowercase - not used in JSX

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 0,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://react-burger-d4ef3.firebaseio.com/ingredients.json').then(response => {
            this.setState({
                ingredients: response.data
            });
        }).catch(err => {
            this.setState({
                error: true
            });
        });
    }

    updatePerchaseState(ingredients) {
        const sum = Object.keys(ingredients).map((key) => {
            return ingredients[key];
        }).reduce((currSum, el) => {
            return currSum + el;
        }, 0);

        this.setState({
            purchasable: (sum > 0) ? true : false
        });
    }

    addIngredienthandler = (type) => {
        let updatedCount = this.state.ingredients[type] + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState(
            {
                ingredients: updatedIngredients,
                totalPrice: newPrice
            }
        );

        this.updatePerchaseState(updatedIngredients);
    }

    removeIngredienthandler = (type) => {
        let updatedCount = this.state.ingredients[type] - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = (updatedCount > 0) ? updatedCount : 0;

        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState(
            {
                ingredients: updatedIngredients,
                totalPrice: newPrice
            }
        );

        this.updatePerchaseState(updatedIngredients);
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
        this.setState({
            loading: true
        });

        const orders = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'man',
                address: {
                    street: 'main',
                    zip: 1234,
                    coountry: 'au'
                },
                email: 'test.com'
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', orders) //.json - firebase specific
            .then((response) => {
                this.setState({
                    loading: false,
                    purchasing: false
                });
            }).catch(err => {
                console.log(err);
                this.setState({
                    loading: false,
                    purchasing: false
                });
            });
    }

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = (this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner></Spinner>);
        if (this.state.ingredients !== null) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}></Burger>
                    <BuildControls
                        purchasing={this.purchasehandler}
                        purchasable={this.state.purchasable}
                        price={this.state.totalPrice}
                        disabled={disabledInfo}
                        ingredientAdded={this.addIngredienthandler}
                        ingredientRemoved={this.removeIngredienthandler}>
                    </BuildControls>
                </Aux>
            );
            orderSummary = (
                <OrderSummary
                    ingredients={this.state.ingredients}
                    purchaseCancel={this.purchaseCancelHandler}
                    purchaseContinue={this.purchaseContinueHandler}
                    totalPrice={this.state.totalPrice}>
                </OrderSummary>
            );
        }
        if (this.state.loading) {
            orderSummary = <Spinner></Spinner>
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

export default withErrorHandler(BurgerBuilder, axios);