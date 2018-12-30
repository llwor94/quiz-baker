import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.div`
	cursor: pointer;
	border-radius: 4px;
	border: 1px solid;
	border-color: ${props => props.theme.accent};
	padding: 8px;
	background-color: ${props => props.theme.secondary};
`;
export const Button = ({ handleClick, text }) => {
	return <StyledButton onClick={handleClick}>{text}</StyledButton>;
};
