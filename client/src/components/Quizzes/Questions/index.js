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

const QuestionWrapper = styled(Wrapper)`
	width: 500px;
	height: 300px;

`;

const QuestionTitle = styled(Title)`
	text-align: center;
	margin-bottom: 10px;
`;

const AnswerWrapper = styled.div`
	height: 80%;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const Answer = styled(Option)`
	margin-left: 70px;
	&:not(:last-child) {
		padding-bottom: 10px;
	}
`;

export const Question = ({ question, handleChange, inputSelection }) => {
	return (
		<QuestionWrapper>
			<QuestionTitle>{question.question}</QuestionTitle>
			<AnswerWrapper>
			{question.options.map((option, i) => (
				<Answer key={i}>
					<RadioButton
						inputId={i.toString()}
						value={i}
						onChange={handleChange}
						checked={inputSelection === i}
					/>
					<Label htmlFor={i}>{option}</Label>
				</Answer>
			))}
			</AnswerWrapper>
		</QuestionWrapper>
	);
};
