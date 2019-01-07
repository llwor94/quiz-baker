import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import { fetchQuizForEdit, fetchTopics } from '../store/actions/quizActions';
import { fetchQuizQuestions } from '../store/actions/questionActions';
import QuizContainer from '../containers/UserQuiz/Quiz';
import QuestionsContainer from '../containers/UserQuiz/Questions/';

const UserQuizPage = ({
	fetchQuizForEdit,
	fetchQuizQuestions,
	fetchTopics,
	edittingQuiz,
	topics,
	questions,
	...props
}) => {
	useEffect(() => {
		fetchQuizForEdit(props.match.params.id);
		fetchQuizQuestions(props.match.params.id);
		fetchTopics();
	}, []);

	if (!edittingQuiz || !topics || !questions) return <div>Loading..</div>;
	else {
		return (
			<Fragment>
				<QuizContainer />
				<QuestionsContainer />
				<div id='new' />
			</Fragment>
		);
	}
};

const mapStateToProps = ({ quizReducer, questionReducer }) => ({
	edittingQuiz: quizReducer.edittingQuiz,
	loading: quizReducer.loading,
	error: quizReducer.error,
	questions: questionReducer.questions,
	topics: quizReducer.topics,
});

export default connect(mapStateToProps, {
	fetchQuizForEdit,
	fetchQuizQuestions,
	fetchTopics,
})(UserQuizPage);
