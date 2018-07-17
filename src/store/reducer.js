import * as actionTypes from './action';

const initialState = {
    ingredients: {
        salad: 0,
        cheese: 0,
        meat: 0,
        bacon:0,
    },
    totalPrice: 4,
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon:0.7,
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

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]+1,
                },
                totalPrice:state.totalPrice + INGREDIENT_PRICES[action.ingredientName],

            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]-1,
                },
                totalPrice:state.totalPrice - INGREDIENT_PRICES[action.ingredientName],

            };
        default:
            return state;
    }
};

export default reducer; 