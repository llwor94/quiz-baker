import { combineReducers } from 'redux';

import authReducer from './authReducer';

export default () => {
	const reducers = combineReducers({ authReducer });
	return reducers;
};
