import * as ActionTypes from './ActionTypes';

//Reviews reducer that takes initial state, action to perform as parameters and performs the appropriate action and returning the new state.
export const Reviews = (state = {
    errMess: null,
    reviews: []
}, action) => {

    switch (action.type) {
        // storing the fetched reviews data in the reviews array and errMess is set to null since the data is fetched correctly and returning the new state. 
        case ActionTypes.ADD_REVIEWS:
            return { ...state, errMess: null, reviews: action.payload };

        // dispatching reviewsFailed action that takes errMess to display the error message and returning the new state.
        case ActionTypes.REVIEWS_FAILED:
            return { ...state, errMess: action.payload };

        //concatinating the newly posted review with the reviews array and returning the new state.
        case ActionTypes.ADD_REVIEW:
            var review = action.payload;
            return { ...state, reviews: state.reviews.concat(review) };

        //otherwise returning the default or initial state(the state that is passed as parameter to this reducer)
        default:
            return state;
    }
};