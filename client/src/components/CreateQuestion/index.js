import React from 'react';
import styled from 'styled-components';
import { InputText } from 'primereact/inputtext';
import { ToggleButton } from 'primereact/togglebutton';

import { MultipleChoice } from './multipleChoice';
import { TrueFalse } from './trueFalse';

const Wrapper = styled.div`
	border-radius: 4px;
	border: 1px solid;
	border-color: ${props => props.theme.accent};
	padding: 5px;
	padding-bottom: 20px;
	background-color: ${props => props.theme.secondary};
	margin-bottom: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Title = styled.div`
	font-size: 18px;
	font-weight: 500;
	line-height: 22px;
	cursor: pointer;
	padding: 5px;
	color: ${props => props.theme.text};
`;

const InputTitleWrapper = styled.div`padding: 20px;`;

export const NewQuestion = ({ children, ...props }) => {
	return (
		<Wrapper>
			<Title>New Question</Title>
			<ToggleButton
				style={{ width: '150px' }}
				onLabel='Multiple Choice'
				offLabel='True/False'
				checked={props.multipleChoice}
				onChange={e => props.setMultipleChoice(e.value)}
			/>
			<InputTitleWrapper>
				<span className='p-float-label'>
					<InputText
						id='float-input'
						type='text'
						size='30'
						value={props.question}
						onChange={e => props.setQuestionTitle(e.target.value)}
					/>
					<label htmlFor='float-input'>Question Title</label>
				</span>
			</InputTitleWrapper>
			{children}
		</Wrapper>
	);
};
