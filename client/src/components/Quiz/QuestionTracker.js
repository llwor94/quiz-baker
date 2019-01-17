import React, { useContext } from 'react';
import styled from 'styled-components';
import { QuestionCtx } from '../../containers/Quiz';
import { ResponseCtx } from '../../pages/Quiz';

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
`;

const Box = styled.div`
	width: 20px;
	height: 20px;
	background-color: ${props =>
		props.correct === null ? props.theme.secondary : props.correct ? '#00ba96' : '#873D48'};
	margin: 4px;
	border-radius: 4px;
	border: ${props => (props.currentQuestion ? '3px solid' : '1px solid')};
	border-color: ${props => (props.currentQuestion ? 'gold' : props.theme.accent)};
`;

const QuestionTracker = () => {
	const [ questionResponse, setQuestionReponse ] = useContext(ResponseCtx);
	const [ currentQuestion, setCurrentQuestion ] = useContext(QuestionCtx);

	return (
		<Wrapper>
			{questionResponse.map((question, id) => (
				<Box key={id} correct={question.correct} currentQuestion={currentQuestion === id} />
			))}
		</Wrapper>
	);
};

export default QuestionTracker;
