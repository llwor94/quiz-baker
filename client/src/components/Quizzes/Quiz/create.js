import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Button } from 'primereact/button';

const Wrapper = styled.div`
	border-radius: 4px;
	border: 1px solid;
	border-color: ${props => props.theme.accent};
	padding: 5px;
	background-color: ${props => props.theme.secondary};
	margin-bottom: 10px;
	display: flex;
	position: relative;
	flex-direction: column;
	align-items: center;

	p {
		font-size: 14px;
		font-weight: 500;
		padding: 10px 0;
	}
`;

const InnerWrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding: 10px;
`;

const Title = styled.div`
	font-weight: 500;
	line-height: 22px;
	cursor: pointer;
	color: ${props => props.theme.text};
`;

export const CreateNewQuiz = ({ children, handleClose, ...props }) => {
	return (
		<Wrapper>
			{children}
			<Button
				style={{ position: 'absolute', top: '5px', right: '5px' }}
				icon='pi pi-times'
				className='p-button-secondary'
				onClick={handleClose}
			/>
			<InnerWrapper>
				{!props.topic.name &&
				props.quizName && (
					<div>
						Please select a topic for your quiz{' '}
						<span style={{ fontWeight: 'bold' }}>{props.quizName}</span>
					</div>
				)}
				{props.topic.name &&
				!props.quizName && (
					<div>
						Please name your quiz for topic{' '}
						<span style={{ fontWeight: 'bold' }}>{props.topic.name}</span>
					</div>
				)}

				<Button
					label='Create Quiz?'
					disabled={props.buttonDisabled}
					className='p-button-raised p-button-secondary'
					onClick={props.handleCreateQuiz}
				/>
			</InnerWrapper>
		</Wrapper>
	);
};

const ButtonWrapper = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	padding-bottom: 10px;
`;

export const CreateQuizButton = ({ handleClick }) => {
	return (
		<ButtonWrapper>
			<Button label='Create a New Quiz' onClick={handleClick} />
		</ButtonWrapper>
	);
};
