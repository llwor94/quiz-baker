import React from 'react';
import styled from 'styled-components';
import { RadioButton } from 'primereact/radiobutton';

const Wrapper = styled.div`
	border-radius: 4px;
	border: 1px solid;
	border-color: ${props => props.theme.accent};
	padding: 8px;
	background-color: ${props => props.theme.secondary};
	margin-bottom: 10px;
	font-family: 'IBM Plex Sans', sans-serif;
	&:hover {
		border-color: rgb(129, 131, 132);
	}
`;

const Title = styled.div`
	font-size: 18px;
	font-weight: 500;
	line-height: 22px;
	cursor: pointer;
	color: ${props => props.theme.text};
`;

const Option = styled.div`padding-top: 4px;`;

const Label = styled.label`
	font-size: 14px;
	font-weight: 400;
	line-height: 21px;
	padding-left: 4px;
	color: ${props => props.theme.text};
`;

export const Question = ({ question, handleChange, inputSelection }) => {
	return (
		<Wrapper>
			<Title>{question.question}</Title>

			{question.options.map((option, i) => (
				<Option key={i}>
					<RadioButton
						inputId={i.toString()}
						value={i}
						onChange={handleChange}
						checked={inputSelection === i}
					/>
					<Label htmlFor={i}>{option}</Label>
				</Option>
			))}
		</Wrapper>
	);
};
