import * as ActionTypes from './ActionTypes';

//Magazines reducer that takes initial state, action to perform as parameters and performs the appropriate action and returns the new state.
export const Magazines = (state = {
    isLoading: true,
    errMess: null,
    magazines: [],
    filteredItemsbyLang: [],
    filteredItemsbyCtgry: [],
    category: '',
    language: '',
    sortedMagazines: [],
    sort: ''
}, action) => {

    switch (action.type) {
        // stores the fetched magazines data in the magazines array and accordingly sets isLoading and errMess properties and the remaining properties are set to total magazines and returning the new state.
        case ActionTypes.ADD_MAGAZINES:
            return { ...state, isLoading: false, errMess: null, magazines: action.payload, filteredItemsbyLang: action.payload, filteredItemsbyCtgry: action.payload, sortedMagazines: action.payload };

        //the mentioned properties of the state are set accordingly to perform the loading action while fetching magazines data from the server and returning the new state.
        case ActionTypes.MAGAZINES_LOADING:
            return { ...state, isLoading: true, errMess: null, magazines: [] }

        //the mentioned properties of the state are set accordingly to dispatch magazinesFailed action that takes errMess to display the error message and returning the new state.
        case ActionTypes.MAGAZINES_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, magazines: [] }

        //performs language filtering action and returns the new state that contains modified values for the mentioned properties of the state.     
        case ActionTypes.FILTER_MAGAGINES_BY_LANG:
            return { ...state, filteredItemsbyLang: action.payload.items, filteredItemsbyCtgry: action.payload.magazines, language: action.payload.lang }

        //performs category filtering action and returns the new state that contains modified values for the mentioned properties of the state. 
        case ActionTypes.FILTER_MAGAGINES_BY_CATEGORY:
            return { ...state, filteredItemsbyCtgry: action.payload.items, filteredItemsbyLang: action.payload.magazines, category: action.payload.category }
        //Performs sorting action and returns the new state that contains modified values of sortedMagazines and sort properties of state     
        case ActionTypes.SORT_MAGAZINES:
            return { ...state, sortedMagazines: action.payload.items, sort: action.payload.sort }

        //identifies top rated magazines and returns the new state that contains modified values for the mentioned properties of the state. 
        case ActionTypes.TOP_RATED_MAGAZINES:
            return { ...state, filteredItemsbyCtgry: action.payload.items, filteredItemsbyLang: action.payload.magazines }

        //the default case is returning the initial state (the state that is passed as parameter to this reducer)
        default:
            return state;
    }
};