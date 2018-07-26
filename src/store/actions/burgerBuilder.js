import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name,
    };
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name,
    };
};

export const setIngredients = (ingredient) => {
    return {
        type : actionTypes.SET_INGREDIENT,
        ingredients:ingredient,
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type : actionTypes.FETCH_INGREDIENTS_FAILED,

    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://burgerpro-ff79f.firebaseio.com/ingredients.json')
        .then((res)=>{
            // console.log(res.data);
            dispatch(setIngredients(res.data));
        })
        .catch(error => {
            dispatch(fetchIngredientsFailed());
        })
    }
}



