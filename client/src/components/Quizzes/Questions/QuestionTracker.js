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
		props.correct === null ? props.theme.secondary : props.correct ? 'green' : 'red'};
	margin: 4px;
	border-radius: 4px;
	border: 1px solid;
	border-color: ${props => props.theme.accent};
`;

export const QuestionTracker = ({ questions, currentQuestion }) => {
	return (
		<Wrapper>
			{questions ? (
				questions.map((question, id) => <Box key={id} correct={question} />)
			) : (
				<div>hi</div>
			)}
		</Wrapper>
	);
};
