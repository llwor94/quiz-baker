import React, { Fragment } from 'react';
import styled from 'styled-components';
import { InputText } from 'primereact/inputtext';

import { Button } from 'primereact/button';

const Wrapper = styled.div`
	border-radius: 4px;
	border: 1px solid;
	border-color: ${props => props.theme.accent};
	padding: 5px;
	background-color: ${props => props.theme.secondary};
	margin-bottom: 10px;
	display: flex;
	flex-direction: ${props => (props.main ? 'row' : 'column')};
	justify-content: ${props => props.main && 'space-between'};
`;

const Title = styled.div`
	font-size: 18px;
	font-weight: 500;
	line-height: 22px;
	cursor: pointer;
	padding-right: 10px;
	display: inline-block;
	color: ${props => props.theme.text};
`;

const QuestionWrapper = styled.div`
	padding: 8px;
	border-radius: 4px;
	border: 1px solid;
	border-color: ${props => props.theme.accent};
	margin: 10px;
	ul {
		padding-left: 40px;
	}
`;

export const EditUserQuiz = ({ quiz, edit, setEdit }) => {
	return (
		<Wrapper main>
			<div>
				{edit ? <InputText value={quiz.title} /> : <Title>{quiz.title}</Title>}

				<div>topic: {quiz.topic}</div>
			</div>
			<Button label={edit ? 'Save' : 'Edit'} onClick={() => setEdit(!edit)} />
		</Wrapper>
	);
};

export const Questions = ({ questions, setIsNewQuestion }) => {
	return (
		<Wrapper>
			<Title>Questions:</Title>
			{questions.length ? (
				questions.map(question => (
					<QuestionWrapper>
						<Title>{question.question}</Title>
						<Button label='Edit?' />
						<ul>{question.options.map(option => <li>{option}</li>)}</ul>
					</QuestionWrapper>
				))
			) : (
				<div>This quiz has no questions.</div>
			)}
			<Button label='New Question' onClick={() => setIsNewQuestion(true)} />
		</Wrapper>
	);
};
