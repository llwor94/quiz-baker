import React from 'react';
import styled from 'styled-components';

const FormWrapper = styled.div`
	text-align: center;
	max-width: 550px;
	margin: 0 auto;

	h1 {
		margin: 30px 0;
		text-transform: uppercase;
		letter-spacing: 5px;
		color: black;
		font-weight: normal;
	}
`;

export const Wrapper = ({ title, handleSubmit, children }) => (
	<FormWrapper>
		<h1>{title}</h1>
		<form onSubmit={handleSubmit}>
			{children}
			<input value='submit' type='submit' />
		</form>
	</FormWrapper>
);

const InputWrapper = styled.input`
	padding: 10px;
	display: block;
	width: 100%;
	border-radius: 3px;
	font-size: inherit;
	font-family: inherit;
	color: inherit;
	border: none;
`;

export const Input = ({ name, type, handleChange, value, placeholder }) => (
	<InputWrapper
		name={name}
		type={type}
		onChange={handleChange}
		value={value}
		placeholder={placeholder}
	/>
);
