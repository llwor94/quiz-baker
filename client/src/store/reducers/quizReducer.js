import {
	FETCH_ALL_QUIZZES_REQUEST,
	FETCH_ALL_QUIZZES_FAILURE,
	FETCH_ALL_QUIZZES_SUCCESS,
} from '../actions';

const initialState = {
	quizzes: undefined,
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
			};
		case FETCH_ALL_QUIZZES_SUCCESS:
			return {
				...state,
				loading: false,
				quizzes: payload.sort((a, b) => b.id - a.id),
			};
		case FETCH_ALL_QUIZZES_FAILURE:
			return {
				...state,
				loading: false,
			};
		default:
			return state;
	}
};

export default quizReducer;
