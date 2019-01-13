import React from 'react';
import styled from 'styled-components';
import { Button as StyledButton } from 'primereact/button';

const StyledButtonWrapper = styled.div`
	display: flex;
	width: ${props => (props.post ? '500px' : '85%')};
	flex-direction: column;
	padding-bottom: 10px;

	.p-button {
		background-color: #dc758f;
		border: #dc758f;

		&:enabled:hover {
			background-color: #ad546b;
			border: #ad546b;
		}
		&:enabled:focus {
			box-shadow: 0 0 0 0.2em #ad546b;
		}
	}
`;

export const Button = ({ handleClick, text, disabled, post }) => {
	return (
		<StyledButtonWrapper post>
			<StyledButton label={text} onClick={handleClick} disabled={disabled} />
		</StyledButtonWrapper>
	);
};
