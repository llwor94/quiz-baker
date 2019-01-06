import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { InputText } from 'primereact/inputtext';
import { AutoComplete } from 'primereact/autocomplete';

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
			<Wrapper main>
				<div style={{ padding: '12px' }}>Loading...</div>
			</Wrapper>
		);
	else
		return (
			<Wrapper main>
				<InnerWrapper>
					{edit ? (
						children
					) : (
						<Fragment>
							<Title>{quiz.title}</Title>
							<Topic>{quiz.topic}</Topic>
							{quiz.description && <Topic>{quiz.description}</Topic>}
						</Fragment>
					)}
				</InnerWrapper>
				<Button label={edit ? 'Save' : 'Edit'} onClick={handleClick} />
			</Wrapper>
		);
};
