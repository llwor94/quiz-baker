import React from 'react';
import styled from 'styled-components';
import { Button } from 'primereact/button';
const Wrapper = styled.div`
	border-radius: 4px;
	border: 1px solid;
	border-color: ${props => props.theme.accent};
	padding: 5px;
	background-color: ${props => props.theme.secondary};
	margin-bottom: 10px;
	display: flex;
	flex-direction: ${props => (props.main ? 'row' : 'column')};
	justify-content: ${props => props.main && 'space-between'};
	align-items: ${props => props.main && 'center'};
`;

const Title = styled.div`
	font-size: 18px;
	font-weight: 500;
	line-height: 22px;
	cursor: pointer;
	padding: 8px;
	padding-right: 10px;
	display: inline-block;
	color: ${props => (props.correct ? 'green' : props.theme.text)};
`;

const QuestionWrapper = styled.div`
	padding: 8px;
	border-radius: 4px;
	border: 1px solid;
	border-color: ${props => props.theme.accent};
	margin: 10px;
	ul {
		padding-left: 40px;
	}
`;
export const Questions = ({ questions, children }) => {
	return (
		<Wrapper style={{ marginBottom: '200px' }}>
			<Title>Questions:</Title>
			{questions.length ? (
				questions.map(question => (
					<QuestionWrapper key={question.id}>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<Title>{question.question}</Title>
							<Button label='Edit' />
						</div>
						<ul>
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
					</QuestionWrapper>
				))
			) : (
				<div>This quiz has no questions.</div>
			)}
			{children}
		</Wrapper>
	);
};
