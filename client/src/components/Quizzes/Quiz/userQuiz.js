import React, { useState } from 'react';
import styled from 'styled-components';

import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

import { Wrapper } from '../../Styles/Wrappers/index';
import { Title } from '../../Styles/Text/title';
import { FooterWrapper } from '../../Styles/Wrappers/footer';

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
		<Wrapper>
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
		</Wrapper>
	);
};
