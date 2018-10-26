import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import app from './app';

const reducers = combineReducers({
    app
});

const loggerMiddleware = createLogger();

const middleware = [
    thunkMiddleware,
    loggerMiddleware
].filter(Boolean);

export default (preloadedState) => {
    return createStore(
        reducers,
        preloadedState,
        applyMiddleware(...middleware)
    );
};
