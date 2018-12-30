import React, { Fragment } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	border-radius: 5px;
	border: 1px solid;
	border-color: ${props => props.theme.accent};
	background-color: ${props => props.theme.secondary};
	margin-bottom: 10px;
	font-family: 'IBM Plex Sans', sans-serif;
	&:hover {
		border-color: rgb(129, 131, 132);
	}
`;

const SideColor = styled.div`
	width: 40px;

	background-color: ${props => (props.correct ? 'green' : 'red')};

	i {
		cursor: pointer;
	}
`;

const ResultWrapper = styled.div`
	display: flex;
	border: 1px solid lightgray;
`;

const InnerWrapper = styled.div`
	padding: 8px;
	flex-grow: 1;
	max-width: 606px;
`;

const NumberWrapper = styled.div`
	font-family: 'IBM Plex Sans', sans-serif;
	color: ${props => props.theme.link};
	display: flex;
	justify-content: flex-end;
	align-items: center;
	h3 {
		padding: 5px;
	}
	span {
		padding: 0 10px;
	}
`;
export const Results = ({ results }) => {
	console.log(results.filter(result => result.correct).length / results.length);
	return (
		<Fragment>
			<Wrapper>
				{results.map(result => (
					<ResultWrapper>
						<SideColor correct={result.correct} />
						<InnerWrapper>
							<h3>{result.question.question}</h3>
							<p>{result.option}</p>
						</InnerWrapper>
					</ResultWrapper>
				))}
			</Wrapper>
			<NumberWrapper>
				<h3>
					{results.filter(result => result.correct).length} / {results.length}
				</h3>{' '}
				<span>|</span>
				<h3>{results.filter(result => result.correct).length / results.length * 100}%</h3>
			</NumberWrapper>
		</Fragment>
	);
};
