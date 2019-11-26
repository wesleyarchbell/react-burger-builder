import * as actions from '../actions/actionTypes';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.3,
    bacon: 1.1,
    meat: 1.3
}

const initialState = {
    ingredients: {
        salad: 0,
        cheese: 0,
        meat: 0,
        bacon: 0
    },
    totalPrice: 0,
    prices: INGREDIENT_PRICES
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actions.ADD_INGREDIENT) : {
            let val =  {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
            return val;
        }
        case (actions.REMOVE_INGREDIENT) : {
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };
        }
        default: {
            return state;
        }
    }
};

export default reducer;