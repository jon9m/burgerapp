import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
}
export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
}
export const setIngredient = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENT,
        ingredients: ingredients
    };
}
export const fetchIngredientFail = () => {
    return {
        type: actionTypes.FETECH_INGREDIENT_FAIL
    };
}
export const initIngredient = () => {
    return dispatch => {
        //Async code
        axios.get('https://react-burger-d4ef3.firebaseio.com/ingredients.json').then(response => {
            dispatch(setIngredient(response.data));
        }).catch(err => {
            dispatch(fetchIngredientFail());
        });

    };
}