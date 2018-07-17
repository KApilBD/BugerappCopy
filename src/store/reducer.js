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

const reducer = (state = initialState, action) => {
    console.log(action.type === actionTypes.ADD_INGREDIENT)

    if(action.type === actionTypes.ADD_INGREDIENT){
        console.log(action.type)
        return {
            ...state,
            ingredients:{
                ...state.ingredients,
                [action.ingredientName]:state.ingredients[action.ingredientName]+1,
            }

        };
    }

    // switch (action.type) {
    //     case actionTypes.ADD_INGREDIENT:
    //         return {
    //             ...state,
    //             ingredients:{
    //                 ...state.ingredients,
    //                 [action.ingredientName]:state.ingredients[action.ingredientName]+1,
    //             }

    //         };
    //     case actionTypes.REMOVE_INGREDIENT:
    //         return {
    //             ...state,
    //             ingredients:{
    //                 ...state.ingredients,
    //                 [action.ingredientName]:state.ingredients[action.ingredientName]-1,
    //             }

    //         };
    //     default:
    //         return state;
    // }

    return state;
                         
};

export default reducer; 