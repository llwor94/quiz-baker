import { combineReducers } from 'redux';

import authReducer from './authReducer';
import quizReducer from './quizReducer';
import forumReducer from './forumReducer';
import questionReducer from './questionReducer';

export default () => {
	const reducers = combineReducers({ authReducer, quizReducer, forumReducer, questionReducer });
	return reducers;
};
