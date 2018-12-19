import {
	SIGN_UP_FAILURE,
	SIGN_UP_REQUEST,
	SIGN_UP_SUCCESS,
	LOG_IN_FAILURE,
	LOG_IN_REQUEST,
	LOG_IN_SUCCESS,
} from '../actions';

const initialState = {
	loggedIn: false,
	user: undefined,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		default:
			return state;
	}
};

export default authReducer;
