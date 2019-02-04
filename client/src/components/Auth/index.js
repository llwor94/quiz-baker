import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { ThemeCtx } from 'theme';
import { Input } from 'styles/Components/Input';
import { Button } from 'styles/Components/Button';
import { LogoWrapper } from 'styles/Register/Logo';

import hatIcon from 'assets/chef.svg';
import darkHat from 'assets/hat.png';

const FormWrapper = styled.div`
	max-width: 550px;
	margin: 0 auto;
	margin-top: 100px;
	${props => props.theme.flex('column', 'center')};

	h1 {
		margin: 40px 0 10px;
		text-transform: uppercase;
		letter-spacing: 5px;
		color: ${props => props.theme.text};
		font-weight: normal;
		text-align: center;
	}

	form {
		${props => props.theme.flex('column', 'center')};
		padding: 30px;
		padding-top: 40px;
	}
`;

const Redirect = styled.div`
	${props => props.theme.flex(undefined, 'center')};
	span {
		padding-right: 4px;
		color: ${props => props.theme.text};
	}

	a {
		color: ${props => props.theme.aqua};
		&:hover {
			color: ${props => props.theme.pink};
		}
	}
`;

const RegisterWrapper = styled.div`
	${props => props.theme.center};
	position: relative;
`;

export const Wrapper = ({ type, handleSubmit, submitDisabled, error, children }) => {
	const [ darkMode, setValue ] = useContext(ThemeCtx);
	return (
		<FormWrapper>
			<h1>{type}</h1>
			<RegisterWrapper style={{ display: 'flex', position: 'relative' }}>
				<LogoWrapper style={{ position: 'relative' }}>
					<span className='Q'>Q</span>
					<span className='B'>B</span>
					<div className='dot'>.</div>
					<img src={darkMode ? darkHat : hatIcon} alt='' />
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
	padding: 5px 0;
	${props => props.theme.flex('column', 'center', 'center')};
	p {
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
