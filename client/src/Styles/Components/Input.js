import React, { useState } from 'react';
import styled from 'styled-components';
import { Picker } from 'emoji-mart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile } from '@fortawesome/free-solid-svg-icons';
import Smiley from '../../assets/smiley';
const InputWrapper = styled.span`
	margin: 10px 0;
	display: inline-block !important;

	label {
		top: ${props => props.isInput && '-.75em'} !important;
		font-size: ${props => props.isInput && '12px'} !important;
		font-size: 14px;
		color: ${props => props.theme.placeholder};
	}
`;

export const StyledInput = styled.input`
	outline: none;
	border-radius: 3px;
	border-top-left-radius: ${props => props.radio && 0};
	border-bottom-left-radius: ${props => props.radio && 0};
	resize: none;
	font-size: 14px;
	color: ${props => props.theme.text};
	background: ${props => props.theme.secondary};
	padding: 0.429em;
	border: 1px solid ${props => props.theme.accent};
	border-left: ${props => props.radio && 'none'};
	&:focus {
		border-color: ${props => props.theme.pink};
	}

	&::placeholder {
		font-family: "Raleway", sans-serif;
		color: ${props => props.theme.placeholder};
		font-size: 14px;
	}
`;

export const Input = ({ value, onChange, label, name, type, disabled, style, inputRef, radio }) => {
	return (
		<InputWrapper className='p-float-label' style={style} radio={radio} isInput={value}>
			<StyledInput
				value={value}
				onChange={onChange}
				id={name}
				name={name}
				type={type}
				autoComplete='off'
				disabled={disabled}
				ref={inputRef}
			/>
			{label && <label htmlFor={name}>{label}</label>}
		</InputWrapper>
	);
};

const StyledTextArea = styled.textarea`
	outline: none;
	border-radius: 3px;

	resize: none;
	font-size: 14px;
	margin-bottom: 10px;
	color: ${props => props.theme.text};
	background-color: ${props => props.theme.secondary};
	padding: 0.429em;
	border: 1px solid ${props => props.theme.accent};
	&:focus {
		border-color: ${props => props.theme.pink};
		outline: none;
	}
`;

export const AddQuestionTextArea = styled.textarea`
	width: 300px;
	height: 115px;
	outline: 1px solid ${props => props.theme.accentPink};
	border: none;
	background-color: ${props => props.theme.secondary};
	resize: none;
	font-size: 18px;
	padding: 5px;
	color: gray;
	&:focus {
		outline: 1px solid ${props => props.theme.accentPink};
	}
`;

export const TextArea = ({ value, onChange, name, inputRef }) => (
	<StyledTextArea
		value={value}
		onChange={onChange}
		name={name}
		rows='5'
		ref={inputRef}
		style={{ width: '100%' }}
	/>
);

export const Label = styled.label`
	border-radius: 3px;
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;

	font-size: 16px;
	color: ${props => props.theme.placeholder};
	background: ${props => props.theme.secondary};
	padding: 0.429em;
	border: 1px solid ${props => props.theme.accent};
	border-left: none;
	width: 55px;
`;

const StyledEmojiArea = styled.span`
	position: relative;
	resize: none;
	width: 100%;
	font-size: 14px;
	margin-bottom: 10px;

	i {
		position: absolute;
		top: 0;
		right: 0;
	}
`;

const AnotherTextArea = styled.textarea`
	padding: 0.429em;
	font-size: 14px;
	resize: none;
	width: 100%;
	height: 100%;
	color: ${props => props.theme.text};
	background: ${props => props.theme.secondary};
	border-radius: 3px;
	border: 1px solid ${props => props.theme.accent};
	&:focus {
		border-color: ${props => props.theme.pink};
		outline: none;
	}
	&::placeholder {
		font-family: "Raleway", sans-serif;
		color: ${props => props.theme.placeholder};
		font-size: 14px;
	}
`;

const Emojis = styled.div`
	transition: transform 0.3s, opacity 0.3s, -webkit-transform 0.3s;
	.emoji-mart {
		position: absolute;
		top: 25px;
		right: -207px;
		border: 1px solid ${props => props.theme.accent};
		border-radius: 5px;
		background: ${props => props.theme.secondary};
		z-index: 10000;
		padding-bottom: 5px;

		.emoji-mart-search {
			margin-top: 6px;
			padding: 0 6px;
			position: relative;
			input {
				font-size: 16px;
				display: block;
				width: 100%;
				padding: 5px 25px 6px 10px;
				border-radius: 5px;
				border: 1px solid ${props => props.theme.accent};
				outline: 0;
				background: ${props => props.theme.main};
			}
			.emoji-mart-search-icon {
				position: absolute;
				top: 9px;
				right: 16px;
				z-index: 2;
				padding: 0;
				border: none;
				background: none;
				svg {
					fill: ${props => props.theme.aqua};
				}
			}
		}
	}
	.emoji-mart-bar {
		border: 0 solid #d9d9d9;
		.emoji-mart-anchors {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding: 0 6px;

			line-height: 0;
			svg,
			.emoji-mart-anchors img {
				fill: ${props => props.theme.placeholder};
				height: 18px;
				width: 18px;
			}
			.emoji-mart-anchor {
				position: relative;
				display: block;
				flex: 1 1 auto;
				text-align: center;
				padding: 12px 4px;
				overflow: hidden;
				transition: color 0.1s ease-out;
			}
		}
	}
	.emoji-mart {
		.emoji-mart-scroll {
			overflow-y: scroll;
			height: 270px;
			padding: 0 6px 6px 6px;
			will-change: transform;
			.emoji-mart-category-label {
				z-index: 2;

				position: -webkit-sticky;
				position: sticky;
				background: ${props => props.theme.secondary};
				color: ${props => props.theme.placeholder};
				padding: 4px 2px;
				font-size: 14px;
				top: 0;
				.emoji-mart-category-label span {
					display: block;
					width: 100%;
					font-weight: 500;
					padding: 5px 6px;
				}
			}
		}
	}
	.emoji-mart-preview {
		display: none;
	}
`;

const EmojiPicker = styled.div`
	svg {
		width: 22px;
		position: absolute;
		top: 4px;
		right: 5px;
		cursor: pointer;
		fill: ${props => props.theme.placeholder};
	}
`;

export const EmojiTextArea = ({ value, onChange, name, inputRef, handleSelect }) => {
	const [ emojis, showEmojis ] = useState(false);

	const handleBlur = e => {
		let currentTarget = e.currentTarget;
		setTimeout(() => {
			if (!currentTarget.contains(document.activeElement)) {
				showEmojis(false);
			}
		}, 0);
	};
	return (
		<StyledEmojiArea>
			<AnotherTextArea
				onClick={() => showEmojis(false)}
				value={value}
				onChange={onChange}
				name={name}
				placeholder='Body'
				rows='5'
				ref={inputRef}
			/>

			<Emojis onBlur={handleBlur} tabIndex='0'>
				<EmojiPicker onClick={() => showEmojis(true)}>
					<Smiley />
				</EmojiPicker>

				{emojis && <Picker style={{ width: '231px' }} onSelect={handleSelect} />}
			</Emojis>
		</StyledEmojiArea>
	);
};

const StyledEmojiInput = styled.div`
	position: relative;
	/* //height: 100%; */
	input {
		width: 100%;
		height: 100%;
		color: ${props => props.theme.text};
		&:focus {
			border-color: ${props => props.theme.pink};
		}
	}
`;

export const EmojiInput = ({
	value,
	onChange,
	name,
	handleSelect,
	onKeyUp,
	style,
	placeholder,
}) => {
	const [ emojis, showEmojis ] = useState(false);

	const handleBlur = e => {
		let currentTarget = e.currentTarget;
		setTimeout(() => {
			if (!currentTarget.contains(document.activeElement)) {
				showEmojis(false);
			}
		}, 0);
	};

	return (
		<StyledEmojiInput style={style}>
			<StyledInput
				value={value}
				onChange={onChange}
				name={name}
				onKeyUp={onKeyUp}
				onClick={() => showEmojis(false)}
				placeholder={placeholder}
			/>
			<Emojis onBlur={handleBlur} tabIndex='0'>
				<EmojiPicker onClick={() => showEmojis(true)}>
					<Smiley />
				</EmojiPicker>
				{emojis && <Picker style={{ width: '231px' }} />}
			</Emojis>
		</StyledEmojiInput>
	);
};
