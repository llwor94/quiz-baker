import axios from 'axios';

import * as actions from './index';

let URL = 'https://lambda-study-app.herokuapp.com/api/posts';
let devURL = 'http://localhost:3400/api/posts';

export const fetchPosts = () => dispatch => {
	dispatch({ type: actions.FETCH_ALL_POSTS_REQUEST });
	axios({ method: 'get', url: URL })
		.then(({ data }) => {
			dispatch({ type: actions.FETCH_ALL_POSTS_SUCCESS, payload: data });
		})
		.catch(({ response }) => console.log(response.data));
};
