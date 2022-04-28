import * as ActionTypes from './ActionTypes';

//Orders reducer that takes initial state, action to perform as parameters and performs the appropriate action and returning the new state.
export const Orders = (state = {
    errMess: null,
    orders: []
}, action) => {

    switch (action.type) {
        // Storing the fetched orders data in the orders array and errMess is set to null since the data is fetched correctly and returning the new state. 
        case ActionTypes.ORDERS_PLACED:
            return { ...state, errMess: null, orders: action.payload };
        // dispatching ordersFailed action that takes errMess to display the error message and returning the new state.
        case ActionTypes.ORDER_FAILED:
            return { ...state, errMess: action.payload };
        //Concatinating the newly posted order with the orders array and returning the new state.
        case ActionTypes.ORDER_PLACED:
            var order = action.payload;
            return { ...state, orders: state.orders.concat(order) };
        case ActionTypes.ORDER_DELETED:
            return {
                ...state,
                orders: state.orders.filter((item) => item._id !== action.payload.id),
            };
    

        default:
            return state;
    }
};