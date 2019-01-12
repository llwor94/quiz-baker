import React from 'react';
import styled from 'styled-components';
import { Button as StyledButton } from 'primereact/button';

const StyledButtonWrapper = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	padding-bottom: 10px;
	background-color: '#DC758F';
`;

export const Button = ({ handleClick, text }) => {
	return (
		<StyledButtonWrapper>
			<StyledButton label={text} onClick={handleClick} />
		</StyledButtonWrapper>
	);
};
