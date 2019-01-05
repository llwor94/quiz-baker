import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import { fetchQuizForEdit, fetchTopics } from '../store/actions/quizActions';
import { fetchQuizQuestions } from '../store/actions/questionActions';
import QuizContainer from '../containers/UserQuiz/Quiz';
import QuestionsContainer from '../containers/UserQuiz/Questions/';

const UserQuizPage = ({ user, ...props }) => {
	useEffect(() => {
		props.fetchQuizForEdit(props.match.params.id);
		props.fetchQuizQuestions(props.match.params.id);
		props.fetchTopics();
	}, []);

	if (!props.edittingQuiz || !props.topics || !props.questions) return <div>Loading..</div>;
	else {
		return (
			<Fragment>
				<QuizContainer quiz={props.edittingQuiz} topics={props.topics} />
				<QuestionsContainer questions={props.questions} />
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
