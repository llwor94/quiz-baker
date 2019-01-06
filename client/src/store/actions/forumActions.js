import axios from 'axios';

import * as actions from './index';

let URL = 'https://lambda-study-app.herokuapp.com/api/posts';

export const fetchPosts = () => dispatch => {
	dispatch({ type: actions.FETCH_ALL_POSTS_REQUEST });
	axios({ method: 'get', url: URL })
		.then(({ data }) => {
			dispatch({ type: actions.FETCH_ALL_POSTS_SUCCESS, payload: data });
		})
		.catch(({ response }) =>
			dispatch({ type: actions.FETCH_ALL_POSTS_FAILURE, payload: response.data.message }),
		);
};

export const fetchPost = id => dispatch => {
	dispatch({ type: actions.FETCH_POST_REQUEST });
	axios({ method: 'get', url: `${URL}/${id}` })
		.then(({ data }) => {
			dispatch({ type: actions.FETCH_POST_SUCCESS, payload: data });
		})
		.catch(({ response }) =>
			dispatch({ type: actions.FETCH_POST_FAILURE, payload: response.data.message }),
		);
};

export const addComment = comment => (dispatch, getState) => {
	dispatch({ type: actions.CREATE_COMMENT_REQUEST });
	let id = getState().forumReducer.post.id;
	axios({
		method: 'post',
		url: `${URL}/${id}/comments`,
		data: comment,
		headers: {
			authorization: getState().authReducer.token,
		},
	})
		.then(({ data }) => {
			dispatch({ type: actions.CREATE_COMMENT_SUCCESS });
			dispatch(fetchPost(id));
		})
		.catch(({ response }) =>
			dispatch({ type: actions.CREATE_COMMENT_FAILURE, payload: response.data.message }),
		);
};
