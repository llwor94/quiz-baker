import { combineReducers } from 'redux';

import authReducer from './authReducer';
import quizReducer from './quizReducer';
import forumReducer from './forumReducer';

export default () => {
	const reducers = combineReducers({ authReducer, quizReducer, forumReducer });
	return reducers;
};
