import axios from 'axios';

import * as actions from './index';
import { checkUser } from './authActions';

let URL = 'https://lambda-study-app.herokuapp.com/api/quizzes';

export const fetchQuizQuestions = id => dispatch => {
	dispatch({ type: actions.FETCH_QUIZ_QUESTIONS_REQUEST });

	axios({
		method: 'get',
		url: `${URL}/${id}/questions`,
	})
		.then(({ data }) => {
			console.log(data);
			dispatch({ type: actions.FETCH_QUIZ_QUESTIONS_SUCCESS, payload: data });
		})
		.catch(({ response }) => console.log(response));
};

export const fetchQuestionResult = ({ id, option }) => (dispatch, getState) => {
	dispatch({ type: actions.FETCH_QUESTION_RESULT_REQUEST });
	let quiz = getState.quizReducer().quiz;
	console.log(quiz, id, option);
	axios({});
};
