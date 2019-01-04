import React from 'react';
import styled from 'styled-components';
import { InputText } from 'primereact/inputtext';
import { ToggleButton } from 'primereact/togglebutton';

import { MultipleChoice } from './multipleChoice';
import { TrueFalse } from './trueFalse';

export const NewQuestion = ({ children, ...props }) => {
	return (
		<div>
			<div>New Question for {props.quiz.title}</div>
			<InputText
				placeholder='Question Title'
				value={props.question}
				onChange={e => props.setQuestionTitle(e.target.value)}
			/>
			<ToggleButton
				style={{ width: '150px' }}
				onLabel='Multiple Choice'
				offLabel='True/False'
				checked={props.multipleChoice}
				onChange={e => props.setMultipleChoice(e.value)}
			/>
			{children}
		</div>
	);
};
