import server from '../../utils/server';
import * as actions from './index';

export const fetchPosts = () => dispatch => {
	dispatch({ type: actions.FETCH_ALL_POSTS_REQUEST });
	server
		.get('/posts')
		.then(({ data }) => {
			dispatch({ type: actions.FETCH_ALL_POSTS_SUCCESS, payload: data });
		})
		.catch(({ response }) =>
			dispatch({ type: actions.FETCH_ALL_POSTS_FAILURE, payload: response.data.message }),
		);
};

export const fetchPost = id => dispatch => {
	dispatch({ type: actions.FETCH_POST_REQUEST });
	server
		.get(`/posts/${id}`)
		.then(({ data }) => {
			dispatch({ type: actions.FETCH_POST_SUCCESS, payload: data });
		})
		.catch(({ response }) =>
			dispatch({ type: actions.FETCH_POST_FAILURE, payload: response.data.message }),
		);
};
