import {
	FETCH_ALL_POSTS_REQUEST,
	FETCH_ALL_POSTS_SUCCESS,
	FETCH_ALL_POSTS_FAILURE,
	FETCH_POST_REQUEST,
	FETCH_POST_SUCCESS,
	FETCH_POST_FAILURE,
} from '../actions';

const initialState = {
	posts: undefined,
	post: undefined,
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
				post: undefined,
			};
		case FETCH_ALL_POSTS_FAILURE:
			return {
				...state,
				loading: false,
				error: payload,
			};
		case FETCH_POST_REQUEST:
			return {
				...state,
				loading: true,
				error: undefined,
			};
		case FETCH_POST_SUCCESS:
			return {
				...state,
				loading: false,
				post: { ...payload, comments: payload.comments.sort((a, b) => b.id - a.id) },
			};
		case FETCH_POST_FAILURE:
			return {
				...state,
				loading: false,
				error: payload,
			};
		default:
			return state;
	}
};

export default forumReducer;
