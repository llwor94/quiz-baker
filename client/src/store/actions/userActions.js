import axios from 'axios';

import * as actions from './index';

let URL = 'https://lambda-study-app.herokuapp.com/api/users';

export const queryUser = username => dispatch => {
	dispatch({ type: actions.FETCH_USER_REQUEST });
	axios({
		method: 'get',
		url: URL,
		params: {
			username,
		},
	}).then(({ data }) => {
		dispatch({ type: actions.FETCH_USER_SUCCESS });
	});
};
