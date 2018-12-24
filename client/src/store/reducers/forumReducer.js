import {
	FETCH_ALL_POSTS_REQUEST,
	FETCH_ALL_POSTS_SUCCESS,
	FETCH_ALL_POSTS_FAILURE,
} from '../actions';

const initialState = {
	posts: undefined,
	loading: false,
	error: undefined,
};

const forumReducer = (state = initialState, { payload, type }) => {
	switch (type) {
		case FETCH_ALL_POSTS_REQUEST:
			return {
				...state,
				loading: true,
				error: undefined,
			};
		case FETCH_ALL_POSTS_SUCCESS:
			return {
				...state,
				loading: false,
				posts: payload.sort((a, b) => b.id - a.id),
			};
		case FETCH_ALL_POSTS_FAILURE:
			return {
				...state,
				loading: false,
			};
		default:
			return state;
	}
};

export default forumReducer;
