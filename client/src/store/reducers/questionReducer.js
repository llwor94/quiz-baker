import {
	FETCH_QUIZ_QUESTIONS_REQUEST,
	FETCH_QUIZ_QUESTIONS_SUCCESS,
	FETCH_QUIZ_QUESTIONS_FAILURE,
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
				questions: payload,
			};
		default:
			return state;
	}
};

export default questionReducer;
