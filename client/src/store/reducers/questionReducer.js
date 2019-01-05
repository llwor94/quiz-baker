import {
	FETCH_QUIZ_QUESTIONS_REQUEST,
	FETCH_QUIZ_QUESTIONS_SUCCESS,
	FETCH_QUIZ_QUESTIONS_FAILURE,
	CREATE_QUESTION_REQUEST,
	CREATE_QUESTION_SUCCESS,
	CREATE_QUESTION_FAILURE,
	EDIT_QUESTION_REQUEST,
	EDIT_QUESTION_SUCCESS,
	EDIT_QUESTION_FAILURE,
} from '../actions';

const initialState = {
	questions: undefined,
	loading: false,
	error: undefined,
};

const questionReducer = (state = initialState, { payload, type }) => {
	switch (type) {
		case FETCH_QUIZ_QUESTIONS_REQUEST:
			return {
				...state,
				loading: true,
				error: undefined,
			};
		case FETCH_QUIZ_QUESTIONS_SUCCESS:
			return {
				...state,
				loading: false,
				questions: payload.sort((a, b) => b.id - a.id),
			};
		case FETCH_QUIZ_QUESTIONS_FAILURE:
			return {
				...state,
				loading: false,
				error: payload,
			};
		case CREATE_QUESTION_REQUEST:
			return {
				...state,
				loading: true,
			};
		case CREATE_QUESTION_SUCCESS:
			return {
				...state,
				loading: false,
			};
		case CREATE_QUESTION_FAILURE:
			return {
				...state,
				loading: false,
				error: payload,
			};
		case EDIT_QUESTION_REQUEST:
			return {
				...state,
				loading: true,
			};
		case EDIT_QUESTION_SUCCESS:
			return {
				...state,
				loading: false,
			};
		case EDIT_QUESTION_FAILURE:
			return {
				...state,
				loading: false,
				error: payload,
			};
		default:
			return state;
	}
};

export default questionReducer;
