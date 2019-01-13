import React from 'react';
import styled from 'styled-components';
import { InputText } from 'primereact/inputtext';

const InputWrapper = styled.span`margin: 10px 0;`;

const StyledInput = styled(InputText)`
	&:focus {
		border-color: ${props => props.theme.pink} !important;
	}
`;

export const Input = ({ value, onChange, label, name }) => (
	<InputWrapper className='p-float-label'>
		<StyledInput value={value} onChange={onChange} id='in' name={name} />
		{label && <label htmlFor='in'>{label}</label>}
	</InputWrapper>
);

const StyledTextArea = styled.textarea`
	outline: none;
	border-radius: 3px;
	border-color: ${props => props.theme.pink};
	resize: none;
	font-size: 14px;
	margin-bottom: 10px;
	color: #333333;
	background: #ffffff;
	padding: 0.429em;
	border: 1px solid #a6a6a6;
	&:focus {
		border-color: ${props => props.theme.pink};
	}
`;

export const TextArea = ({ value, onChange, name }) => (
	<StyledTextArea value={value} onChange={onChange} name={name} />
);
