import React, { Component } from 'react';
import Aux from '../../hoc/Auxi';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 0,
        purchasable: false,
        purchasing: false
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
        alert("Contine");
    }

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients} purchaseCancel={this.purchaseCancelHandler} purchaseContinue={this.purchaseContinueHandler} totalPrice={this.state.totalPrice}></OrderSummary>
                </Modal>
                <div>
                    <Burger ingredients={this.state.ingredients}></Burger>
                </div>
                <div>
                    <BuildControls
                        purchasing={this.purchasehandler}
                        purchasable={this.state.purchasable}
                        price={this.state.totalPrice}
                        disabled={disabledInfo}
                        ingredientAdded={this.addIngredienthandler}
                        ingredientRemoved={this.removeIngredienthandler}></BuildControls>
                </div>
            </Aux>
        );
    }
}

export default BurgerBuilder;