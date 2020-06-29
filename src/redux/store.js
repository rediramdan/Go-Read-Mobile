import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';

import rootReducer from './reducers/index';

// const logger = createLogger();
const enhancer = applyMiddleware(promiseMiddleware);

const store = createStore(rootReducer, enhancer);

export default store;
