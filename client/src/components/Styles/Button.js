import React from 'react';
import styled from 'styled-components';
import { Button as StyledButton } from 'primereact/button';

const StyledButtonWrapper = styled.div`
	display: inline-block;
	width: ${props => props.full && '100%'};
	
	.p-button {
		width: ${props => props.full && '100%'};
		background-color: ${props => props.theme.pink};
		border-color: ${props => props.theme.pink};
		&:enabled:hover {
			background-color: ${props => props.theme.darkPink};
			border-color: ${props => props.theme.darkPink};
		}
		&:enabled:focus {
			box-shadow: 0 0 0 0.2em ${props => props.theme.darkPink};
		}
	}
`;

const Button = ({ label, onClick, disabled, icon, style, full }) => (
	<StyledButtonWrapper full={full} style={style}>
		<StyledButton label={label} onClick={onClick} disabled={disabled} icon={icon} />
	</StyledButtonWrapper>
);

export default Button;
