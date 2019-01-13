import React, { Fragment } from 'react';
import styled from 'styled-components';

import { Wrapper } from '../../Styles/Wrappers/index';

const SideColor = styled.div`
	width: 40px;
	background-color: ${props => (props.correct ? '#00ba96' : '#873D48')};

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
	return (
		<Fragment>
			<Wrapper style={{ width: '500px' }}>
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
				<h3>
					{Math.floor(
						results.filter(result => result.correct).length / results.length * 100,
					)}%
				</h3>
			</NumberWrapper>
		</Fragment>
	);
};
