import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

import { withRouter } from 'react-router-dom';

const burger = (props) => {
    let transformerdIngredients = Object.keys(props.ingredients).map((ingredientkey) => {
        return [...Array(props.ingredients[ingredientkey])].map((val, index) => {
            return <BurgerIngredient key={ingredientkey + index} type={ingredientkey}></BurgerIngredient>;
        });
    }).reduce((arr, currIngredient) => {
        return arr.concat(currIngredient);
    }, []);

    if (transformerdIngredients.length === 0) {
        transformerdIngredients = <p>Please start adding ingredients...</p>
    }

    return (
        <div className={classes.burger}>
            <BurgerIngredient type="bread-top"></BurgerIngredient>
            {transformerdIngredients}
            <BurgerIngredient type="bread-bottom"></BurgerIngredient>
        </div>
    );
}

export default withRouter(burger);