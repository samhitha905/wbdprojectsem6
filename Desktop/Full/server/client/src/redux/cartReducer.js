import * as ActionTypes from './ActionTypes';

//CartReducer that takes initial state and  action to perform as parameters and performs the appropriate action and returns the new state.
export const cartReducer = (state = { cart: [], items: [], currentItem: null }, action) => {

    switch (action.type) {
        // for get products action type it returns state and items is modified as action.payload

        case ActionTypes.GET_PRODUCTS:
            return { ...state, items: action.payload };



        case ActionTypes.ADD_TO_CART:
            //we check which item to be added to cart
            const item = state.items.find((item) => item._id === action.payload.id)
            //if item is in cart it returns true else false
            const inCart = state.cart.find((item) => item._id === action.payload.id ? true : false)

            //if item is in cart item quantity is increased else quantity is set to 1
            return {
                ...state,
                cart: inCart ?
                    state.cart.map((item) => item._id === action.payload.id ? { ...item, qty: item.qty + 1 } : item) :
                    [...state.cart, { ...item, qty: 1 }],
            };

        //to remove item we filter items we check and filter items whose id is not equal to remove item id
        case ActionTypes.REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter((item) => item._id !== action.payload.id),
            };

        //to adjust quantity we increase quantity of item to value entered by user
        case ActionTypes.ADJUST_QTY:
            return {
                ...state,
                cart: state.cart.map((item) => item._id === action.payload.id ? { ...item, qty: +action.payload.qty } : item)
            };

        //current item is loaded
        case ActionTypes.LOAD_CURRENT_ITEM:
            return {
                ...state,
                currentItem: action.payload,
            };
        //Action Type which empties the cart in the state
        case ActionTypes.CART_EMPTY:
            return {
                ...state,
                cart: []
            }
        default:
            return state;

    }
}


