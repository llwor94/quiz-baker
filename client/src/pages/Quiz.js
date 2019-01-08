import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import { fetchQuiz } from '../store/actions/quizActions';
import { fetchQuizQuestions } from '../store/actions/questionActions';
import QuizContainer from '../containers/Quiz/Quiz';
import LeaderBoardContainer from '../containers/Quiz/LeaderBoard';

const QuizPage = ({ fetchQuiz, fetchQuizQuestions, quiz, questions, ...props }) => {
	useEffect(() => {
		fetchQuiz(props.match.params.id);
		fetchQuizQuestions(props.match.params.id);
	}, []);

	if (!quiz || !questions) return <div>Loading...</div>;
	else
		return (
			<div style={{ display: 'flex' }}>
				<LeaderBoardContainer />
				<QuizContainer />
			</div>
		);
};

const mapStateToProps = ({ quizReducer, questionReducer }) => ({
	quiz: quizReducer.quiz,
	loading: quizReducer.loading,
	questions: questionReducer.questions,
});

export default connect(mapStateToProps, { fetchQuiz, fetchQuizQuestions })(QuizPage);
