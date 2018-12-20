import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import reducers from './reducers';

export default () => {
	const store = createStore(reducers(), applyMiddleware(thunk, logger));
	return store;
};
