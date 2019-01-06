import React from 'react';
import styled from 'styled-components';

import { Button } from 'primereact/button';

import { QuestWrapper } from '../../Styles/Wrappers';

const InnerWrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding: 10px;
`;

export const CreateNewQuiz = ({ children, handleClose, handleSubmit, quiz, ...props }) => {
	return (
		<QuestWrapper>
			{children}
			<Button
				style={{ position: 'absolute', top: '5px', right: '5px' }}
				icon='pi pi-times'
				className='p-button-secondary'
				onClick={handleClose}
			/>
			<InnerWrapper>
				{!quiz.topic &&
				quiz.title && (
					<div>
						Please select a topic for your quiz{' '}
						<span style={{ fontWeight: 'bold' }}>{quiz.title}</span>
					</div>
				)}
				{quiz.topic &&
				!quiz.title && (
					<div>
						Please name your quiz for topic{' '}
						<span style={{ fontWeight: 'bold' }}>{quiz.topic}</span>
					</div>
				)}

				<Button
					label='Create Quiz?'
					disabled={props.buttonDisabled}
					className='p-button-raised p-button-secondary'
					onClick={handleSubmit}
				/>
			</InnerWrapper>
		</QuestWrapper>
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
