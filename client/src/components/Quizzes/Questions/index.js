import React from 'react';
import styled from 'styled-components';

import { RadioButton } from 'primereact/radiobutton';

import { Wrapper } from '../../Styles/Wrappers/index';
import { Title } from '../../Styles/Text/title';

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
