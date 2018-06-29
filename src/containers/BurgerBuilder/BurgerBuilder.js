import React, { Component } from 'react';
import Aux from '../../hoc/Auxi';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 2,
            meat: 1
        },
        totalPrice: 4
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
    }

    render() {
        return (
            <Aux>
                <div>
                    <Burger ingredients={this.state.ingredients}></Burger>
                </div>
                <div>
                    <BuildControls ingredientAdded={this.addIngredienthandler} ingredientRemoved={this.removeIngredienthandler}></BuildControls>
                </div>
            </Aux>
        );
    }
}

export default BurgerBuilder;