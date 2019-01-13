import React from 'react';
import styled from 'styled-components';

import Button from '../../Styles/Button';
import { ToggleButton } from 'primereact/togglebutton';
import { Input } from '../../Styles/Input';

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

const EditWrapper = styled(Wrapper)`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	
`;

export const EditQuestionWrapper = ({ children, ...props }) => {
	return (
		<EditWrapper edit>
			{props.new && <Title>New Question</Title>}
			<Button
				style={{ position: 'absolute', top: '3px', right: '3px' }}
				icon='pi pi-times'
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
				<Input
					value={props.question}
					onChange={e => props.setQuestionTitle(e.target.value)}
					label='Question Title'
				/>
			</InputTitleWrapper>
			{children}
		</EditWrapper>
	);
};
