import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import { fetchQuiz } from '../store/actions/quizActions';
import QuizContainer from '../containers/Quiz/Quiz';
import LeaderBoardContainer from '../containers/Quiz/LeaderBoard';
import styled from 'styled-components';

const StyledWrapper = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
const QuizPage = ({ fetchQuiz, fetchQuizQuestions, quiz, questions, ...props }) => {
	useEffect(() => {
		fetchQuiz(props.match.params.id);
	}, []);

	if (!quiz || !questions) return <div>Loading...</div>;
	else
		return (
			<StyledWrapper>
				<LeaderBoardContainer />
				<QuizContainer />
			</StyledWrapper>
		);
};

const mapStateToProps = ({ quizReducer }) => ({
	quiz: quizReducer.quiz,
	loading: quizReducer.loading,
	questions: quizReducer.questions,
});

export default connect(mapStateToProps, { fetchQuiz })(QuizPage);
