import React from 'react';
import styled from 'styled-components';

import { Button } from 'primereact/button';
import { ToggleButton } from 'primereact/togglebutton';
import { InputText } from 'primereact/inputtext';

import { QuestWrapper, Wrapper } from '../../Styles/Wrappers/index';
import { Title } from '../../Styles/Text/title';

export const QuestionsWrapper = ({ children }) => {
	return (
		<QuestWrapper main>
			<Title main>Questions:</Title>

			{children}
		</QuestWrapper>
	);
};

export const QuestionWrapper = ({ question, setEdit }) => {
	return (
		<Wrapper key={question.id}>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<Title main>{question.question}</Title>
				<Button label='Edit' onClick={() => setEdit(true)} />
			</div>
			<ul style={{ paddingLeft: '40px' }}>
				{question.options.map((option, i) => (
					<li
						key={i}
						style={{
							color: question.answer === i + 1 ? 'green' : 'black',
						}}
					>
						{option}
					</li>
				))}
			</ul>
		</Wrapper>
	);
};

const InputTitleWrapper = styled.div`padding: 20px;`;

export const EditQuestionWrapper = ({ children, ...props }) => {
	return (
		<Wrapper edit>
			{props.new && <Title>New Question</Title>}
			<Button
				style={{ position: 'absolute', top: '3px', right: '3px' }}
				icon='pi pi-times'
				className='p-button-secondary'
				onClick={props.handleClick}
			/>
			<ToggleButton
				style={{ width: '150px', marginTop: '5px' }}
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
