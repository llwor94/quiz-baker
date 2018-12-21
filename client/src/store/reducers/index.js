import { combineReducers } from 'redux';

import authReducer from './authReducer';
import quizReducer from './quizReducer';

export default () => {
	const reducers = combineReducers({ authReducer, quizReducer });
	return reducers;
};
