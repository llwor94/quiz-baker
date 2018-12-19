import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

export default () => {
	const store = createStore(combineReducers({}), applyMiddleware(thunk, logger));
	return store;
};
