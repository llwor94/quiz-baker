import axios from 'axios';

import * as actions from './index';
import { checkUser } from './authActions';

let URL = 'https://lambda-study-app.herokuapp.com/api/quizzes';
let devURL = 'http://localhost:3400/api/quizzes';

export const fetchTopics = () => dispatch => {
	dispatch({ type: actions.FETCH_TOPICS_REQUEST });
	axios({
		method: 'get',
		url: `${URL}/topics`,
	})
		.then(({ data }) => {
			dispatch({ type: actions.FETCH_TOPICS_SUCCESS, payload: data });
		})
		.catch(({ response }) =>
			dispatch({ type: actions.FETCH_TOPICS_FAILURE, payload: response.data.message }),
		);
};

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
			dispatch({ type: actions.FETCH_ALL_QUIZZES_SUCCESS, payload: data });
		})
		.catch(({ response }) =>
			dispatch({ type: actions.FETCH_ALL_QUIZZES_FAILURE, payload: response.data.message }),
		);
};

export const fetchUserQuizzes = () => async (dispatch, getState) => {
	dispatch({ type: actions.FETCH_ALL_USER_QUIZZES_REQUEST });
	await checkUser();

	axios({
		method: 'get',
		url: URL,
		headers: {
			authorization: getState().authReducer.token,
		},
	})
		.then(({ data }) => {
			let quizzes = data.filter(quiz => quiz.author === getState().authReducer.user.username);
			dispatch({ type: actions.FETCH_ALL_USER_QUIZZES_SUCCESS, payload: quizzes });
		})
		.catch(({ response }) =>
			dispatch({
				type: actions.FETCH_ALL_USER_QUIZZES_FAILURE,
				payload: response.data.message,
			}),
		);
};

export const fetchQuiz = id => async (dispatch, getState) => {
	dispatch({ type: actions.FETCH_QUIZ_REQUEST });
	await checkUser();

	axios({
		method: 'get',
		url: `${URL}/${id}`,
		headers: {
			authorization: getState().authReducer.token,
		},
	})
		.then(({ data }) => {
			dispatch({ type: actions.FETCH_QUIZ_SUCCESS, payload: data });
		})
		.catch(({ response }) =>
			dispatch({ type: actions.FETCH_QUIZ_FAILURE, payload: response.data.message }),
		);
};

export const createQuiz = quiz => (dispatch, getState) => {
	dispatch({ type: actions.CREATE_QUIZ_REQUEST });
	console.log(quiz, getState().authReducer.token);

	axios({
		method: 'post',
		url: URL,
		headers: {
			authorization: getState().authReducer.token,
		},
		data: quiz,
	})
		.then(({ data }) => {
			console.log(data);
			quiz.id = data[0];
			dispatch({ type: actions.CREATE_QUIZ_SUCCESS, payload: quiz });
		})
		.catch(({ response }) => {
			dispatch({ type: actions.CREATE_QUIZ_FAILURE, payload: response.data.message });
		});
};

export const fetchQuizForEdit = id => async (dispatch, getState) => {
	dispatch({ type: actions.FETCH_USER_QUIZ_SUCCESS });
	await checkUser();
	axios({
		method: 'get',
		url: `${URL}/${id}`,
		headers: {
			authorization: getState().authReducer.token,
		},
	})
		.then(({ data }) => {
			dispatch({ type: actions.FETCH_USER_QUIZ_SUCCESS, payload: data });
		})
		.catch(({ response }) =>
			dispatch({ type: actions.FETCH_USER_QUIZ_FAILURE, payload: response.data.message }),
		);
};

export const updateUserScore = (score, quizId) => async (dispatch, getState) => {
	dispatch({ type: actions.UPDATE_USER_SCORE_REQUEST });

	axios({
		method: 'patch',
		url: `${URL}/${quizId}`,
		headers: {
			authorization: getState().authReducer.token,
		},
		data: { score: score },
	})
		.then(({ data }) => {
			dispatch({ type: actions.UPDATE_USER_SCORE_SUCCESS });
		})
		.catch(({ response }) =>
			dispatch({ type: actions.UPDATE_USER_SCORE_FAILURE, payload: response.data.message }),
		);
};

export const updateUserFavorite = (favorite, quizId) => async (dispatch, getState) => {
	dispatch({ type: actions.UPDATE_USER_FAVORITE_REQUEST });
	console.log(favorite);
	axios({
		method: 'patch',
		url: `${URL}/${quizId}`,
		headers: {
			authorization: getState().authReducer.token,
		},
		data: { favorite: favorite },
	})
		.then(({ data }) => {
			dispatch({ type: actions.UPDATE_USER_FAVORITE_SUCCESS });
			dispatch(fetchQuizzes());
		})
		.catch(({ response }) =>
			dispatch({
				type: actions.UPDATE_USER_FAVORITE_FAILURE,
				payload: response.data.message,
			}),
		);
};
