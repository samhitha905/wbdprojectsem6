import * as ActionTypes from './ActionTypes'

//signfeed reducer that takes initial state, action to perform as parameters and performs the appropriate action and returning the new state.
export const signfeed = (state = {
    regusers: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_USERS:
            return {
                ...state,
                regusers: action.payload
            }
        case ActionTypes.ADD_USER:
            var reg = action.payload
            return {
                ...state,
                regusers: state.regusers.concat(reg)
            }
        default:
            return state;
    }
};