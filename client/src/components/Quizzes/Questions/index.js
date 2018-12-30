import React from 'react';
import styled from 'styled-components';
import { RadioButton } from 'primereact/radiobutton';

export const Question = ({ question }) => {
	console.log(question);
	return (
		<div>
			<h1>{question.question}</h1>
			{question.options.map(option => <p>{option}</p>)}
		</div>
	);
};
