import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    const transformerdIngredients = Object.keys(props.ingredients).map((ingredientkey) => {
        return [...Array(props.ingredients[ingredientkey])].map((val, index) => {
            return <BurgerIngredient key={index} type={ingredientkey}></BurgerIngredient>;
        });
    });
    return (
        <div className={classes.burger}>
            <BurgerIngredient type="bread-top"></BurgerIngredient>
            {/*<BurgerIngredient type="cheese"></BurgerIngredient>
            <BurgerIngredient type="meat"></BurgerIngredient>*/}
            {transformerdIngredients}
            <BurgerIngredient type="bread-bottom"></BurgerIngredient>
        </div>
    );
}

export default burger;