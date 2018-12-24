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
		default:
			return state;
	}
};

export default forumReducer;
