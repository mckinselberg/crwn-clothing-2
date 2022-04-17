import { compose, createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';

import { rootReducer } from './root-reducer';

const middlewares = [logger];

const composedEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, undefined, composedEnhancers(applyMiddleware(...middlewares)));