import axios from 'axios';

import * as actions from './index';

let URL = 'https://lambda-study-app.herokuapp.com/api/auth';
let devURL = 'http://localhost:3400/api/auth';

export const register = user => dispatch => {
	dispatch({ type: actions.SIGN_UP_REQUEST });
	console.log(user);
	axios({
		method: 'post',
		url: `${URL}/register`,
		data: user,
	})
		.then(({ data }) => {
			localStorage.setItem('user', JSON.stringify(data));
			dispatch({ type: actions.SIGN_UP_SUCCESS, payload: data.user });
		})
		.catch(({ response }) =>
			dispatch({ type: actions.SIGN_UP_FAILURE, payload: response.data.message }),
		);
};

export const login = user => dispatch => {
	dispatch({ type: actions.LOG_IN_REQUEST });
	axios({
		method: 'post',
		url: `${URL}/login`,
		data: user,
	})
		.then(({ data }) => {
			localStorage.setItem('user', JSON.stringify(data));
			dispatch({ type: actions.LOG_IN_SUCCESS, payload: data.user });
		})
		.catch(({ response }) =>
			dispatch({ type: actions.LOG_IN_FAILURE, payload: response.data.message }),
		);
};

export const checkUser = () => dispatch => {
	let data = JSON.parse(localStorage.getItem('user'));
	dispatch({ type: actions.CHECK_USER_SUCCESS, payload: data.user });
};

export const logout = () => ({
	type: actions.LOG_OUT_REQUEST,
});
