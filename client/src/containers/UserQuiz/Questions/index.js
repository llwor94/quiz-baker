import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Button } from 'primereact/button';
import EditQuestionContainer from './EditQuestions';
import { QuestionsWrapper } from '../../../components/Quizzes/Questions/edit';
import CreateQuestionContainer from './CreateQuestion';
import styled from 'styled-components';

const StyledButton = styled.a`
	.p-button {
		background-color: ${props => props.theme.accentPink} !important;
		border-color: ${props => props.theme.accentPink};
		&:enabled:hover {
			background-color: #ad546b;
			border: #ad546b;
		}
		&:enabled:focus {
			box-shadow: 0 0 0 0.2em #ad546b;
		}
	}
`;

const Questions = ({ questions, ...props }) => {
	const [ isNewQuestion, setIsNewQuestion ] = useState(false);

	return (
		<QuestionsWrapper>
			{questions.length ? (
				questions.map(question => <EditQuestionContainer question={question} />)
			) : (
				<div>This quiz has no questions.</div>
			)}
			{isNewQuestion ? (
				<CreateQuestionContainer setIsNewQuestion={setIsNewQuestion} />
			) : (
				<StyledButton href='#new'>
					<Button
						style={{ width: '100%' }}
						label='New Question'
						onClick={() => {
							setIsNewQuestion(true);
						}}
					/>
				</StyledButton>
			)}
		</QuestionsWrapper>
	);
};

const mapStateToProps = ({ quizReducer }) => ({
	edittingQuiz: quizReducer.edittingQuiz,
	loading: quizReducer.loading,
	error: quizReducer.error,
	questions: quizReducer.questions,
	topics: quizReducer.topics,
});

export default connect(mapStateToProps)(Questions);
