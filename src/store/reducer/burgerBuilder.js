import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

const reducer = (state = initialState, action) => {
    console.log(action.type === actionTypes.ADD_INGREDIENT)

    // if(action.type === actionTypes.ADD_INGREDIENT){
    //     console.log(action.type)
    //     return {
    //         ...state,
    //         ingredients:{
    //             ...state.ingredients,
    //             [action.ingredientName]:state.ingredients[action.ingredientName]+1,
    //         }

    //     };
    // }

    const addIngredient = (state,action) => {
        const updateIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1, };
        const updateIngredients = updateObject(state.ingredients, updateIngredient);
        const updateState = {
            ingredients: updateIngredients,
            totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        }
        // return {
        //         ...state,
        //         ingredients:{
        //             ...state.ingredients,
        //             [action.ingredientName]:state.ingredients[action.ingredientName]+1,
        //         },
        //         totalPrice:state.totalPrice + INGREDIENT_PRICES[action.ingredientName],

        //     };
        return updateObject(state, updateState);
    }


    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);

        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],

            };
        case actionTypes.SET_INGREDIENT:
            return {
                ...state,
                // ingredients: action.ingredients,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat,
                },
                totalPrice: 4,
                error: false,
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true,
            }
        default:
            return state;
    }
};

export default reducer; 