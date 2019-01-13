import server from '../../utils/server';
import * as actions from './index';
import { checkUser } from './authActions';

export const fetchTopics = () => dispatch => {
	dispatch({ type: actions.FETCH_TOPICS_REQUEST });
	server
		.get('/quizzes/topics')
		.then(({ data }) => {
			dispatch({ type: actions.FETCH_TOPICS_SUCCESS, payload: data });
		})
		.catch(({ response }) =>
			dispatch({ type: actions.FETCH_TOPICS_FAILURE, payload: response }),
		);
};

export const fetchQuizzes = () => async dispatch => {
	dispatch({ type: actions.FETCH_ALL_QUIZZES_REQUEST });
	await checkUser();
	server
		.get('/quizzes')
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

	server
		.get('/quizzes')
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
	server
		.get(`/quizzes/${id}`)
		.then(({ data }) => {
			dispatch({ type: actions.FETCH_QUIZ_SUCCESS, payload: data });
			dispatch(fetchQuizQuestions(id));
		})
		.catch(({ response }) =>
			dispatch({ type: actions.FETCH_QUIZ_FAILURE, payload: response.data.message }),
		);
};

export const fetchQuizForEdit = id => async (dispatch, getState) => {
	dispatch({ type: actions.FETCH_USER_QUIZ_REQUEST });
	await checkUser();
	server
		.get(`/quizzes/${id}`)
		.then(({ data }) => {
			dispatch({ type: actions.FETCH_USER_QUIZ_SUCCESS, payload: data });
		})
		.catch(({ response }) =>
			dispatch({ type: actions.FETCH_USER_QUIZ_FAILURE, payload: response.data.message }),
		);
};

export const fetchQuizQuestions = id => async (dispatch, getState) => {
	dispatch({ type: actions.FETCH_QUIZ_QUESTIONS_REQUEST });
	await checkUser();
	server
		.get(`/quizzes/${id}/questions`)
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
