import React, { Fragment } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	border-radius: 4px;
	border: 1px solid;
	border-color: ${props => props.theme.accent};
	padding: 5px;
	background-color: ${props => props.theme.secondary};
	margin-bottom: 10px;
`;

const Title = styled.div`
	font-size: 18px;
	font-weight: 500;
	line-height: 22px;
	cursor: pointer;
	color: ${props => props.theme.text};
`;

export const EditUserQuiz = ({ quiz }) => {
	return (
		<Wrapper>
			<Title>{quiz.title}</Title>
			<div>topic: {quiz.topic}</div>
		</Wrapper>
	);
};
