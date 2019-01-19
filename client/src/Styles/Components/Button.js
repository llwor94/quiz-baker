import React, { useState } from 'react';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';
import anime from 'animejs';
import { Button as StyledButton } from 'primereact/button';

const StyledButtonWrapper = styled.div`
	display: inline-block;
	width: ${props => props.full && '100%'};
	margin-bottom: ${props => props.full && '10px'};
	.p-button {
		width: ${props => props.full && '100%'};
		background-color: ${props =>
			props.secondary
				? props.theme.aqua
				: props.white ? props.theme.lightGray : props.theme.pink};
		border-color: ${props =>
			props.secondary
				? props.theme.aqua
				: props.white ? props.theme.lightGray : props.theme.pink};
		&:enabled:hover {
			background-color: ${props =>
				props.secondary
					? props.theme.aqua
					: props.white ? props.theme.gray : props.theme.darkPink};
			border-color: ${props =>
				props.secondary
					? props.theme.aqua
					: props.white ? props.theme.gray : props.theme.darkPink};
		}
		&:enabled:focus {
			box-shadow: 0 0 0 0.2em
				${props => (props.secondary ? props.theme.aqua : props.theme.darkPink)};
		}
	}
`;

export const SettingsButton = {
	margin: '5px 0',
};

export const Button = ({ label, onClick, disabled, icon, style, full, secondary, white }) => (
	<StyledButtonWrapper full={full} style={style} secondary={secondary} white={white}>
		<StyledButton label={label} onClick={onClick} disabled={disabled} icon={icon} />
	</StyledButtonWrapper>
);

const animateButtonOut = button => anime({ targets: button, width: 150 });
const animateButtonIn = button => anime({ targets: button, width: 35 });
export const BackButton = ({ onClick, style }) => {
	const [ hovered, setHovered ] = useState(false);

	return (
		<Transition in={hovered} onEnter={animateButtonOut} onExit={animateButtonIn}>
			<StyledButtonWrapper
				secondary
				style={style}
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
			>
				<StyledButton
					style={{ width: '100%' }}
					className='p-button'
					label={hovered && 'Go Back'}
					onClick={onClick}
					icon='pi pi-arrow-left'
				/>
			</StyledButtonWrapper>
		</Transition>
	);
};
