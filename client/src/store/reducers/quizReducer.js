import {
	FETCH_ALL_QUIZZES_REQUEST,
	FETCH_ALL_QUIZZES_FAILURE,
	FETCH_ALL_QUIZZES_SUCCESS,
	FETCH_QUIZ_REQUEST,
	FETCH_QUIZ_SUCCESS,
	FETCH_QUIZ_FAILURE,
} from '../actions';

const initialState = {
	quizzes: undefined,
	quiz: undefined,
	loading: false,
	error: undefined,
};

const quizReducer = (state = initialState, { payload, type }) => {
	switch (type) {
		case FETCH_ALL_QUIZZES_REQUEST:
			return {
				...state,
				loading: true,
				error: undefined,
				quiz: undefined,
			};
		case FETCH_ALL_QUIZZES_SUCCESS:
			return {
				...state,
				loading: false,
				quizzes: payload.filter(quiz => quiz.question_count).sort((a, b) => b.id - a.id),
			};
		case FETCH_ALL_QUIZZES_FAILURE:
			return {
				...state,
				loading: false,
			};
		case FETCH_QUIZ_REQUEST:
			return {
				...state,
				loading: true,
			};
		case FETCH_QUIZ_SUCCESS:
			return {
				...state,
				loading: false,
				quiz: payload,
			};
		default:
			return state;
	}
};

export default quizReducer;
