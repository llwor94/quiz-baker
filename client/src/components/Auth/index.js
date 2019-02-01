import React from 'react';
import styled from 'styled-components';

import { Input } from '../../Styles/Components/Input';

import { Button } from '../../Styles/Components/Button';
import { Link } from 'react-router-dom';

import { LogoWrapper } from '../../Styles/Register/Logo';

import hatIcon from '../../assets/chef.svg';

const FormWrapper = styled.div`
	max-width: 550px;

	margin: 0 auto;
	margin-top: 100px;
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
		padding-top: 40px;
	}
`;

const Redirect = styled.div`
	display: flex;
	justify-content: center;

	span {
		padding-right: 4px;
		color: ${props => props.theme.text};
	}

	a {
		color: ${props => props.theme.aqua};
		&:hover {
			color: ${props => props.theme.header};
		}
	}
`;

const RegisterWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
`;

export const Wrapper = ({ type, handleSubmit, submitDisabled, error, children, location }) => {
	return (
		<FormWrapper>
			<h1>{type}</h1>
			<RegisterWrapper style={{ display: 'flex', position: 'relative' }}>
				<LogoWrapper style={{ position: 'relative' }}>
					<span className='Q'>Q</span>
					<span className='B'>B</span>
					<div className='dot'>.</div>
					<img src={hatIcon} />
				</LogoWrapper>
				<form onSubmit={handleSubmit}>
					{children}
					{error && <p>{error}</p>}
					<Button
						label={type}
						disabled={submitDisabled}
						style={{ marginTop: '20px', textTransform: 'uppercase' }}
					/>
				</form>
			</RegisterWrapper>
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
	padding: 5px 0;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	p {
		font-size: 12px;
		color: ${props => props.theme.accentRed};
	}
`;

export const InputWrap = ({ name, type, handleChange, value, placeholder, disabled, error }) => (
	<InputWrapper>
		<Input
			name={name}
			type={type}
			value={value}
			label={placeholder}
			onChange={handleChange}
			disabled={disabled}
		/>

		{error && <p>{error}</p>}
	</InputWrapper>
);
