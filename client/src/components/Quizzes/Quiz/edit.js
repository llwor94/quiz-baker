import React, { Fragment } from 'react';
import styled from 'styled-components';

import { Button } from 'primereact/button';

import { PaddedTitle } from '../../Styles/Text/title';
import { QuestWrapper } from '../../Styles/Wrappers/index';

const Topic = styled.a`
	font-weight: 700;
	color: ${props => props.theme.text};
	padding: 0 8px 8px;
`;

const InnerWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

export const EditUserQuiz = ({
	quiz,

	edit,

	children,
	handleClick,
	loading,
	...props
}) => {
	if (loading)
		return (
			<QuestWrapper secondary>
				<div style={{ padding: '12px' }}>Loading...</div>
			</QuestWrapper>
		);
	else
		return (
			<QuestWrapper secondary>
				<InnerWrapper>
					{edit ? (
						children
					) : (
						<Fragment>
							<PaddedTitle>{quiz.title}</PaddedTitle>
							<Topic>{quiz.topic}</Topic>
							{quiz.description && <Topic>{quiz.description}</Topic>}
						</Fragment>
					)}
				</InnerWrapper>
				<Button label={edit ? 'Save' : 'Edit'} onClick={handleClick} />
			</QuestWrapper>
		);
};
