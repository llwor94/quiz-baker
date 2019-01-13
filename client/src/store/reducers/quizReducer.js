import {
	FETCH_ALL_QUIZZES_REQUEST,
	FETCH_ALL_QUIZZES_FAILURE,
	FETCH_ALL_QUIZZES_SUCCESS,
	FETCH_QUIZ_REQUEST,
	FETCH_QUIZ_SUCCESS,
	FETCH_QUIZ_FAILURE,
	FETCH_TOPICS_REQUEST,
	FETCH_TOPICS_SUCCESS,
	FETCH_TOPICS_FAILURE,
	FETCH_USER_QUIZ_SUCCESS,
	FETCH_USER_QUIZ_REQUEST,
	FETCH_USER_QUIZ_FAILURE,
	FETCH_ALL_USER_QUIZZES_REQUEST,
	FETCH_ALL_USER_QUIZZES_SUCCESS,
	FETCH_ALL_USER_QUIZZES_FAILURE,
	FETCH_QUIZ_QUESTIONS_REQUEST,
	FETCH_QUIZ_QUESTIONS_SUCCESS,
	FETCH_QUIZ_QUESTIONS_FAILURE,
} from '../actions';

const initialState = {
	quizzes: undefined,
	quiz: undefined,
	loading: false,
	error: undefined,
	topics: undefined,
	newQuizLoading: false,
	newQuiz: undefined,
	edittingQuiz: undefined,
	userQuizzes: undefined,
	questions: undefined,
};

const quizReducer = (state = initialState, { payload, type }) => {
	switch (type) {
		case FETCH_ALL_QUIZZES_REQUEST:
			return {
				...state,
				loading: true,
				error: undefined,
				quiz: undefined,
				questions: undefined,
			};
		case FETCH_ALL_QUIZZES_SUCCESS:
			return {
				...state,
				loading: false,
				quizzes: payload.filter(quiz => quiz.question_count).sort((a, b) => b.id - a.id),
			};
		case FETCH_ALL_QUIZZES_FAILURE:
			return {
				...state,
				loading: false,
				error: payload,
			};
		case FETCH_QUIZ_REQUEST:
			return {
				...state,
				loading: true,
			};
		case FETCH_QUIZ_SUCCESS:
			return {
				...state,
				loading: false,
				quiz: payload,
			};
		case FETCH_QUIZ_FAILURE:
			return {
				...state,
				loading: false,
				error: payload,
			};

		case FETCH_TOPICS_REQUEST:
			return {
				...state,
				loading: true,
			};
		case FETCH_TOPICS_SUCCESS:
			return {
				...state,
				loading: false,
				topics: payload,
			};
		case FETCH_TOPICS_FAILURE:
			return {
				...state,
				loading: false,
				error: payload,
			};

		case FETCH_USER_QUIZ_REQUEST:
			return {
				...state,
				loading: true,
			};
		case FETCH_USER_QUIZ_SUCCESS:
			return {
				...state,
				loading: false,
				edittingQuiz: payload,
			};
		case FETCH_USER_QUIZ_FAILURE:
			return {
				...state,
				loading: false,
				error: payload,
			};
		case FETCH_ALL_USER_QUIZZES_REQUEST:
			return {
				...state,
				loading: true,
			};
		case FETCH_ALL_USER_QUIZZES_SUCCESS:
			return {
				...state,
				loading: false,
				edittingQuiz: undefined,
				userQuizzes: payload.sort((a, b) => b.id - a.id),
			};
		case FETCH_QUIZ_QUESTIONS_REQUEST:
			return {
				...state,
				loading: true,
				error: undefined,
			};
		case FETCH_QUIZ_QUESTIONS_SUCCESS:
			return {
				...state,
				loading: false,
				questions: payload.sort((a, b) => b.id - a.id),
			};
		case FETCH_QUIZ_QUESTIONS_FAILURE:
			return {
				...state,
				loading: false,
				error: payload,
			};

		default:
			return state;
	}
};

export default quizReducer;
