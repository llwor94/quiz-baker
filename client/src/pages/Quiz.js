import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';

import { fetchQuiz, updateUserScore } from '../store/actions/quizActions';
import { fetchQuizQuestions } from '../store/actions/questionActions';
import Quiz from '../containers/Quiz/Quiz';

const QuizPage = ({ fetchQuiz, fetchQuizQuestions, quiz, questions, ...props }) => {
	useEffect(() => {
		fetchQuiz(props.match.params.id);
		fetchQuizQuestions(props.match.params.id);
	}, []);

	if (!quiz || !questions) return <div>Loading...</div>;
	else
		return (
			<Fragment>
				<Quiz user={props.user} />
			</Fragment>
		);
};

const mapStateToProps = ({ quizReducer, questionReducer }) => ({
	quiz: quizReducer.quiz,
	loading: quizReducer.loading,
	questions: questionReducer.questions,
});

export default connect(mapStateToProps, { fetchQuiz, fetchQuizQuestions })(QuizPage);
