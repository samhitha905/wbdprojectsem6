import * as ActionTypes from './ActionTypes';

//Newspapers reducer that takes initial state, action to perform as parameters and performs the appropriate action and returns the new state.
export const Newspapers = (state = {
    isLoading: true,
    errMess: null,
    newspapers: [],
    sortedNewspapers: [],
    sort: '',
    filteredItems: [],
    language: ''
}, action) => {

    switch (action.type) {
        // stores the fetched newspapers data in the newspapers array and accordingly sets isLoading and errMess properties and the remaining properties are set to total newspapers and returning the new state.
        case ActionTypes.ADD_NEWSPAPERS:
            return { ...state, isLoading: false, errMess: null, newspapers: action.payload, filteredItems: action.payload, sortedNewspapers: action.payload };

        //the mentioned properties of the state are set accordingly to perform the loading action while fetching newspapers data from the server and returning the new state.
        case ActionTypes.NEWSPAPERS_LOADING:
            return { ...state, isLoading: true, errMess: null, newspapers: [] }

        //the mentioned properties of the state are set accordingly to dispatch newspapersFailed action that takes errMess to display the error message and returning the new state.
        case ActionTypes.NEWSPAPERS_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, newspapers: [] }

        //performs language filtering action and returns the new state that contains modified values for the mentioned two properties(filteredItems, language) of the state. 
        case ActionTypes.FILTER_NEWSPAPERS_BY_LANG:
            return { ...state, filteredItems: action.payload.items, language: action.payload.lang }
        //Performs sorting action and returns the new state that contains modified values of sortedNewspapers and sort properties of state 
        case ActionTypes.SORT_NEWSPAPERS:
            return { ...state, sortedNewspapers: action.payload.items, sort: action.payload.sort }

        //identifies top rated newspapers and returns the new state that contains modified values for the mentioned property(filteredItems) of the state. 
        case ActionTypes.TOP_RATED_NEWSPAPERS:
            return { ...state, filteredItems: action.payload.items }

        //otherwise returning the default or initial state(the state that is passed as parameter to this reducer)
        default:
            return state;
    }
};