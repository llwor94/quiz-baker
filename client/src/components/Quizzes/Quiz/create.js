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

export const CreateNewQuiz = ({ children, ...props }) => {
	return (
		<Wrapper>
			{children}
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
				{!props.newQuiz ? (
					<Button
						label='Create Quiz?'
						disabled={props.buttonDisabled}
						className='p-button-raised p-button-secondary'
						onClick={props.handleCreateQuiz}
					/>
				) : (
					<InnerWrapper>
						<div style={{ paddingBottom: '5px' }}>
							New Quiz<span style={{ fontWeight: 'bold', padding: '0 2px' }}>
								{props.quizName}
							</span>
							created!
						</div>
						<Button
							label='View Quiz'
							icon='pi pi-arrow-right'
							iconPos='right'
							onClick={props.handleGoToEdit}
						/>
					</InnerWrapper>
				)}
			</InnerWrapper>
		</Wrapper>
	);
};
