import axios from 'axios';

import * as actions from './index';
import { checkUser } from './authActions';

let URL = 'https://lambda-study-app.herokuapp.com/api/quizzes';
let devURL = 'http://localhost:3400/api/quizzes';

export const fetchQuizzes = () => async (dispatch, getState) => {
	dispatch({ type: actions.FETCH_ALL_QUIZZES_REQUEST });
	await checkUser();

	axios({
		method: 'get',
		url: URL,
		headers: {
			authorization: getState().authReducer.token,
		},
	})
		.then(({ data }) => {
			console.log(data);
			dispatch({ type: actions.FETCH_ALL_QUIZZES_SUCCESS, payload: data });
		})
		.catch(({ response }) => console.log(response));
};
