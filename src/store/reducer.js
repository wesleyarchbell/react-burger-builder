import * as actions from './actions';

const initialState = {
    ingredients: {
        salad: 0,
        cheese: 0,
        meat: 0,
        bacon: 0
    },
    totalPrice: 5
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actions.ADD_INGREDIENT) : {
            let val =  {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1     
                }
            };
            return val;
        }
        case (actions.REMOVE_INGREDIENT) : {
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1     
                }
            };
        }
        default: {
            return state;
        }
    }
};

export default reducer;