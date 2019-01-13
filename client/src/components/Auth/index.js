import React from 'react';
import styled from 'styled-components';

import { InputText } from 'primereact/inputtext';
import Button from '../Styles/Button';
import { Link } from 'react-router-dom';

const FormWrapper = styled.div`
	max-width: 550px;
	margin: 0 auto;
	display: flex;
	justify-content: center;
	flex-direction: column;

	h1 {
		margin: 40px 0 10px;
		text-transform: uppercase;
		letter-spacing: 5px;
		color: ${props => props.theme.text};
		font-weight: normal;
		text-align: center;
	}

	form {
		display: flex;
		justify-content: center;
		flex-direction: column;
		padding: 30px;
	}
`;

const Redirect = styled.div`
	display: flex;
	justify-content: center;

	span {
		padding-right: 4px;
		color: ${props => props.theme.text};
	}
`;

export const Wrapper = ({ type, handleSubmit, submitDisabled, error, children, location }) => {
	return (
		<FormWrapper>
			<h1>{type}</h1>
			<form onSubmit={handleSubmit}>
				{children}
				{error && <p>{error}</p>}
				<Button
					label={type}
					disabled={submitDisabled}
					style={{ marginTop: '20px', textTransform: 'uppercase' }}
				/>
			</form>
			{type === 'login' ? (
				<Redirect>
					<span>Don't have an account?</span>
					<Link to='/register'>Sign up now</Link>
				</Redirect>
			) : (
				<Redirect>
					<span>Already have an account?</span>
					<Link to='/login'>Login</Link>
				</Redirect>
			)}
		</FormWrapper>
	);
};

const InputWrapper = styled.div`
	display: flex;
	padding: 15px 0;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const StyledInput = styled(InputText)`
	width: 100%;
	padding: 15px;
	background-color: ${props => props.theme.secondary} !important;
	border-color: ${props => props.theme.accent} !important;
	color: ${props => props.theme.text}
`;

export const Input = ({ name, type, handleChange, value, placeholder, disabled, error }) => (
	<InputWrapper>
		<span className='p-float-label' style={{ width: '100%' }}>
			<StyledInput
				id={name}
				name={name}
				type={type}
				value={value}
				onChange={handleChange}
				autoComplete='off'
				disabled={disabled}
			/>
			<label htmlFor={name}>{placeholder}</label>
		</span>
		{error && <p>{error}</p>}
	</InputWrapper>
);
