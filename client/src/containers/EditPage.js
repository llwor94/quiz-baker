import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';

import EditQuizContainer from './EditQuiz';
import EditQuestionsContainer from './EditQuestions';

const EditQuizPage = ({ ...props }) => {
	useEffect(() => {
		props.fetchQuizForEdit(props.match.params.id);
		props.fetchQuizQuestions(props.match.params.id);
		props.fetchTopics();
	}, []);

	if (!props.edittingQuiz || !props.topics || !props.questions) return <div>Loading..</div>;
	else {
		return (
			<div>
				<EditQuizContainer quiz={props.edittingQuiz} topics={props.topics} />
			</div>
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
})(EditQuizPage);
