import {
	SIGN_UP_FAILURE,
	SIGN_UP_REQUEST,
	SIGN_UP_SUCCESS,
	LOG_IN_FAILURE,
	LOG_IN_REQUEST,
	LOG_IN_SUCCESS,
	LOG_OUT_REQUEST,
	CHECK_USER_SUCCESS,
	GET_USER_REQUEST,
	GET_USER_FAILURE,
	GET_USER_SUCCESS,
} from '../actions';

const initialState = {
	user: undefined,
	loading: false,
	error: undefined,
	token: undefined,
};

const authReducer = (state = initialState, { payload, type }) => {
	switch (type) {
		case LOG_IN_REQUEST:
			return {
				...state,
				loading: true,
				error: undefined,
			};
		case LOG_IN_SUCCESS:
			return {
				...state,
				loading: false,
				user: payload,
			};
		case LOG_IN_FAILURE:
			return {
				...state,
				loading: false,
				error: payload,
			};
		case SIGN_UP_REQUEST:
			return {
				...state,
				loading: true,
				error: undefined,
			};
		case SIGN_UP_SUCCESS:
			return {
				...state,
				loading: false,
				user: payload,
			};
		case SIGN_UP_FAILURE:
			return {
				...state,
				loading: false,
				error: payload,
			};
		case LOG_OUT_REQUEST:
			return {
				...state,
				user: undefined,
			};
		case CHECK_USER_SUCCESS:
			return {
				...state,
				user: payload.user,
				token: payload.token,
			};
		case GET_USER_REQUEST:
			return {
				...state,
				loading: true,
			};
		case GET_USER_SUCCESS:
			return {
				...state,
				loading: false,
				user: payload,
			};
		default:
			return state;
	}
};

export default authReducer;
