import React from 'react';
import styled from 'styled-components';
import { Button as StyledButton } from 'primereact/button';

const StyledButtonWrapper = styled.div`
	display: inline-block;
	width: ${props => props.full && '100%'};
	margin-bottom: ${props => props.full && '10px'};
	.p-button {
		width: ${props => props.full && '100%'};
		background-color: ${props => (props.secondary ? props.theme.aqua : props.theme.pink)};
		border-color: ${props => (props.secondary ? props.theme.aqua : props.theme.pink)};
		&:enabled:hover {
			background-color: ${props =>
				props.secondary ? props.theme.aqua : props.theme.darkPink};
			border-color: ${props => (props.secondary ? props.theme.aqua : props.theme.darkPink)};
		}
		&:enabled:focus {
			box-shadow: 0 0 0 0.2em
				${props => (props.secondary ? props.theme.aqua : props.theme.darkPink)};
		}
	}
`;

export const SettingsButton = {
	margin: '5px',
};

export const Button = ({ label, onClick, disabled, icon, style, full, secondary }) => (
	<StyledButtonWrapper full={full} style={style} secondary={secondary}>
		<StyledButton label={label} onClick={onClick} disabled={disabled} icon={icon} />
	</StyledButtonWrapper>
);
