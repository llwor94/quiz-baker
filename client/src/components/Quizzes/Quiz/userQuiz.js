import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

const QuizWrapper = styled.div`
	padding: 8px;
	border-radius: 4px;
	border: 1px solid;
	border-color: ${props => props.theme.accent};
	display: flex;
	background-color: ${props => props.theme.secondary};
	margin-bottom: 10px;

	&:hover {
		border-color: rgb(129, 131, 132);
	}
`;

const InnerWrapper = styled.div`
	flex-grow: 1;
	position: relative;
	max-width: 606px;
`;

const Header = styled.div`
	font-size: 12px;
	font-weight: 400;
	line-height: 16px;
	display: flex;
	justify-content: space-between;
	margin-bottom: 8px;
	color: ${props => props.theme.link};
`;
const Topic = styled.a`
	font-weight: 700;
	color: ${props => props.theme.text};
	padding: 0 5px;
`;

const Title = styled.div`
	font-size: 18px;
	font-weight: 500;
	line-height: 22px;
	cursor: pointer;
	color: ${props => props.theme.text};
`;

const DescriptionWrapper = styled.div`
	overflow: hidden;
	word-wrap: break-word;
	word-break: break-word;
	p {
		font-size: 14px;
		font-weight: 400;
		line-height: 21px;
		word-wrap: break-word;
		word-break: break-word;
		color: ${props => props.theme.text};
	}
`;
const FooterWrapper = styled.div`
	display: flex;
	align-items: center;
	font-size: 12px;
	font-weight: 700;
	button {
		width: auto;
		height: 25px;
		white-space: nowrap;
		padding-right: 4px;
		margin-right: 4px;
		text-transform: capitalize;
		overflow-wrap: initial;
		word-break: initial;
		border-radius: 2px;
		transition: background-color 0.1s ease 0s;
		background: transparent;
		border: none;
		color: ${props => props.theme.accentText};
		cursor: pointer;
		padding: initial;
	}
`;

export const Quiz = ({ quiz, handleClick, handleDelete }) => {
	const [ modalVisable, setModalVisable ] = useState(false);
	const footer = (
		<div>
			<Button
				label='Yes'
				icon='pi pi-check'
				onClick={() => {
					handleDelete();
					setModalVisable(false);
				}}
				className='p-button-danger'
			/>
			<Button
				label='No'
				icon='pi pi-times'
				onClick={() => setModalVisable(false)}
				className='p-button-secondary'
			/>
		</div>
	);
	return (
		<QuizWrapper>
			<InnerWrapper>
				<Header>
					<div>
						<Topic>{quiz.topic}</Topic>
					</div>
				</Header>
				<div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
					<Title onClick={handleClick}>{quiz.title}</Title>
				</div>
				<Dialog
					visible={modalVisable}
					style={{ width: '25vw' }}
					footer={footer}
					onHide={() => setModalVisable(false)}
				>
					Are you sure you'd like to delete your quiz {quiz.title}? This action cannot be
					undone.
				</Dialog>
				{quiz.description && (
					<DescriptionWrapper>
						<p>{quiz.description}</p>
					</DescriptionWrapper>
				)}
				<FooterWrapper>
					<button>{quiz.question_count} questions</button>
					<button onClick={() => setModalVisable(true)}>Delete</button>
				</FooterWrapper>
			</InnerWrapper>
		</QuizWrapper>
	);
};
