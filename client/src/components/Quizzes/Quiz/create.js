import React from 'react';
import styled from 'styled-components';

import Button from '../../Styles/Button';

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
					onClick={handleSubmit}
				/>
			</InnerWrapper>
		</QuestWrapper>
	);
};

export const CreateQuizButton = ({ handleClick }) => {
	return (
		<Button
			label='Create a New Quiz'
			onClick={handleClick}
			full
			style={{ paddingBottom: '10px' }}
		/>
	);
};
