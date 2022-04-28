import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Newspapers } from './newspapers';
import { Magazines } from './magazines';
import { cartReducer } from './cartReducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createForms } from 'react-redux-form';
import { InitialFeedback, InitialOrder } from './forms';
import { signfeed } from './register'
import { Reviews } from './reviews';
import { Orders } from "./orders";
import {blog} from './blog';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// All reducers are imported and then combined and exported as store

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            newspapers: Newspapers,
            magazines: Magazines,            
            regusers: signfeed,
            orders:Orders,
            blogs: blog,
            reviews: Reviews,
            ...createForms({
                feedback: InitialFeedback,
                order: InitialOrder

            }),
            cartReducer: cartReducer,
        }),
        composeEnhancers(applyMiddleware(thunk, logger))

    );

    return store;
}
