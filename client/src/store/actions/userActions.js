import server from '../../utils/server';
import * as actions from './index';

export const queryUser = username => dispatch => {
	dispatch({ type: actions.FETCH_USER_REQUEST });
	server.get('/users', { params: { username } }).then(({ data }) => {
		dispatch({ type: actions.FETCH_USER_SUCCESS });
	});
};
