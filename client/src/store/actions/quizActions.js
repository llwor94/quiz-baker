import axios from 'axios';

import * as actions from './index';

let URL = 'https://lambda-study-app.herokuapp.com/api/quizzes';
let devURL = 'http://localhost:3400/api/quizzes';

export const fetchAllQuizzes = () => dispatch => {
	dispatch({ type: actions.FETCH_ALL_QUIZZES_REQUEST });
	axios({
		method: 'get',
		url: URL,
	}).then(({ data }) => {
		console.log(data);
	});
};
