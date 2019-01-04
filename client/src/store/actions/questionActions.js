import axios from 'axios';

import * as actions from './index';

let URL = 'https://lambda-study-app.herokuapp.com/api/quizzes';

export const fetchQuizQuestions = id => dispatch => {
	dispatch({ type: actions.FETCH_QUIZ_QUESTIONS_REQUEST });

	axios({
		method: 'get',
		url: `${URL}/${id}/questions`,
	})
		.then(({ data }) => {
			dispatch({ type: actions.FETCH_QUIZ_QUESTIONS_SUCCESS, payload: data });
		})
		.catch(({ response }) =>
			dispatch({
				type: actions.FETCH_QUIZ_QUESTIONS_FAILURE,
				payload: response.data.message,
			}),
		);
};

export const createQuestion = (quizId, question) => (dispatch, getState) => {
	dispatch({ type: actions.CREATE_QUESTION_REQUEST });
	axios({
		method: 'post',
		url: `${URL}/${quizId}/questions`,
		headers: {
			authorization: getState().authReducer.token,
		},
		data: question,
	})
		.then(({ data }) => {
			dispatch({ type: actions.CREATE_QUESTION_SUCCESS });
		})
		.catch(({ response }) => {
			dispatch({ type: actions.CREATE_QUESTION_FAILURE, payload: response.data.message });
		});
};

export const fetchQuestion = id => (dispatch, getState) => {
	dispatch({ type: actions.FETCH_QUESTION_REQUEST });
	dispatch(fetchQuizQuestions(id)).then(() => {
		console.log(getState().quizReducer.quiz, getState().questionReducer.questions[0]);
	});
};
