import server from '../../utils/server';
import * as actions from './index';

export const register = user => dispatch => {
	dispatch({ type: actions.SIGN_UP_REQUEST });
	server
		.post('/auth/register', user)
		.then(({ data }) => {
			localStorage.setItem('user', JSON.stringify(data));
			server.defaults.headers.common['Authorization'] = data.token;
			dispatch({ type: actions.SIGN_UP_SUCCESS, payload: data.user });
		})
		.catch(({ response }) =>
			dispatch({ type: actions.SIGN_UP_FAILURE, payload: response.data.message }),
		);
};

export const login = user => dispatch => {
	dispatch({ type: actions.LOG_IN_REQUEST });
	server
		.post('/auth/login', user)
		.then(({ data }) => {
			localStorage.setItem('user', JSON.stringify(data));
			server.defaults.headers.common['Authorization'] = data.token;
			dispatch({ type: actions.LOG_IN_SUCCESS, payload: data.user });
		})
		.catch(({ response }) =>
			dispatch({ type: actions.LOG_IN_FAILURE, payload: response.data.message }),
		);
};

export const checkUser = () => dispatch => {
	let data = JSON.parse(localStorage.getItem('user'));

	if (data) {
		dispatch({ type: actions.CHECK_USER_SUCCESS, payload: data });
	} else {
		dispatch({
			type: actions.CHECK_USER_SUCCESS,
			payload: { user: undefined, token: undefined },
		});
	}
};

export const getUser = id => dispatch => {
	let userData = JSON.parse(localStorage.getItem('user'));
	console.log(userData);
	dispatch({ type: actions.GET_USER_REQUEST });
	server
		.get(`/users/${id}`)
		.then(({ data }) => {
			let newUser = { ...userData, user: data };
			localStorage.setItem('user', JSON.stringify(newUser));
			dispatch({ type: actions.GET_USER_SUCCESS, payload: data });
		})
		.catch(({ response }) => console.log(response));
};
export const logout = () => {
	delete server.defaults.headers.common['Authorization'];
	localStorage.removeItem('user');
	return { type: actions.LOG_OUT_REQUEST };
};
