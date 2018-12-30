import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.div`
	font-family: 'IBM Plex Sans', sans-serif;
	cursor: pointer;
	border-radius: 4px;
	border: 1px solid;
	border-color: ${props => props.theme.accent};
	padding: 8px;
	background-color: ${props => props.theme.secondary};
`;

export const Button = ({ handleClick }) => {
	return <StyledButton onClick={handleClick}>Check Answer</StyledButton>;
};
