import React from 'react';
import styled from 'styled-components';

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

export const QuestionTracker = ({ questions, currentQuestion }) => {
	console.log(questions);
	return (
		<Wrapper>
			{questions ? (
				questions.map((question, id) => (
					<Box
						key={id}
						correct={question.correct}
						currentQuestion={currentQuestion === id}
					/>
				))
			) : (
				<div>hi</div>
			)}
		</Wrapper>
	);
};
