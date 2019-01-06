import axios from 'axios';

import * as actions from './index';
import { checkUser } from './authActions';

let URL = 'https://lambda-study-app.herokuapp.com/api/quizzes';

export const fetchQuizQuestions = id => async (dispatch, getState) => {
	dispatch({ type: actions.FETCH_QUIZ_QUESTIONS_REQUEST });
	await checkUser();
	axios({
		method: 'get',
		url: `${URL}/${id}/questions`,
		headers: {
			authorization: getState().authReducer.token,
		},
	})
		.then(({ data }) => {
			dispatch({ type: actions.FETCH_QUIZ_QUESTIONS_SUCCESS, payload: data });
		})
		.catch(({ response }) => {
			console.log(response);
			dispatch({
				type: actions.FETCH_QUIZ_QUESTIONS_FAILURE,
				payload: response,
			});
		});
};

export const fetchQuestion = id => (dispatch, getState) => {
	dispatch({ type: actions.FETCH_QUESTION_REQUEST });
	dispatch(fetchQuizQuestions(id)).then(() => {
		console.log(getState().quizReducer.quiz, getState().questionReducer.questions[0]);
	});
};
