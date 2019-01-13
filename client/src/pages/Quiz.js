import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import { fetchQuiz } from '../store/actions/quizActions';
import QuizContainer from '../containers/Quiz/Quiz';
import LeaderBoardContainer from '../containers/Quiz/LeaderBoard';

const QuizPage = ({ fetchQuiz, quiz, questions, ...props }) => {
	useEffect(() => {
		fetchQuiz(props.match.params.id);
	}, []);

	if (!quiz || !questions) return <div>Loading...</div>;
	else
		return (
			<div style={{ position: 'relative' }}>
				<LeaderBoardContainer />
				<QuizContainer />
			</div>
		);
};

const mapStateToProps = ({ quizReducer }) => ({
	quiz: quizReducer.quiz,
	loading: quizReducer.loading,
	questions: quizReducer.questions,
});

export default connect(mapStateToProps, { fetchQuiz })(QuizPage);
