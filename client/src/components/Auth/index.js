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

export const Wrapper = ({ type, handleSubmit, submitDisabled, error, children }) => (
	<FormWrapper>
		<h1>{type}</h1>
		<form onSubmit={handleSubmit}>
			{children}
			{error && <p>{error}</p>}
			<input value='submit' type='submit' disabled={submitDisabled} />
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

export const Input = ({
	name,
	type,
	handleChange,
	handleKeyUp,
	value,
	placeholder,
	handleBlur,
	disabled,
	error,
}) => (
	<div>
		<InputWrapper
			name={name}
			type={type}
			value={value}
			onChange={handleChange}
			onKeyUp={handleKeyUp}
			placeholder={placeholder}
			onBlur={handleBlur}
			autoComplete='off'
			disabled={disabled}
		/>
		{error && <p>{error}</p>}
	</div>
);
