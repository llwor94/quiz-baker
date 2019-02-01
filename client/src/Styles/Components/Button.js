import React, { useState } from 'react';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';
import anime from 'animejs';
import { Button as StyledButton } from 'primereact/button';

const StyledButtonWrapper = styled.div`
	display: inline-block;
	width: ${props => props.full && '100%'};
	margin-bottom: ${props => props.full && '10px'};
	background-color: ${props => props.theme.secondary};
	.p-button {
		width: ${props => props.full && '100%'};
		background-color: ${props =>
			props.secondary
				? props.theme.aqua
				: props.white ? props.theme.accent : props.theme.pink};
		border-color: ${props =>
			props.secondary
				? props.theme.aqua
				: props.white ? props.theme.accent : props.theme.pink};
		&:enabled:hover {
			background-color: ${props =>
				props.secondary
					? props.theme.darkAqua
					: props.white ? props.theme.darkAccent : props.theme.darkPink};
			border-color: ${props =>
				props.secondary
					? props.theme.darkAqua
					: props.white ? props.theme.darkAccent : props.theme.darkPink};
		}
		&:enabled:focus {
			box-shadow: 0 0 0 0.2em
				${props => (props.secondary ? props.theme.darkAqua : props.theme.darkPink)};
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

const animateButtonOut = button => anime({ targets: button, width: 125 });
const animateButtonIn = button => anime({ targets: button, width: 35 });
export const BackButton = ({ onClick, style, className }) => {
	const [ hovered, setHovered ] = useState(false);
	const [ entered, setEntered ] = useState(false);

	return (
		<Transition
			in={hovered}
			timeout={100}
			onEnter={animateButtonOut}
			onExit={animateButtonIn}
			onEntered={() => setEntered(true)}
			onExiting={() => setEntered(false)}
		>
			<StyledButtonWrapper
				secondary
				style={style}
				className={className}
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
			>
				<StyledButton
					style={{ width: '100%' }}
					className='p-button'
					label={entered ? 'Go Back' : ''}
					onClick={onClick}
					icon='pi pi-arrow-left'
				/>
			</StyledButtonWrapper>
		</Transition>
	);
};
