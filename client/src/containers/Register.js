import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';

import { register } from '../store/actions/authActions';
import { Wrapper, Input } from '../components/Auth';

const Register = ({ register, serverError }) => {
	const [ userInput, setInputValue ] = useState({
		username: undefined,
		email: undefined,
		password: undefined,
		passwordCheck: undefined,
	});

	const [ user, setUser ] = useState({
		username: undefined,
		email: undefined,
		password: undefined,
	});

	const [ error, setError ] = useState({
		username: undefined,
		email: undefined,
		password: undefined,
	});

	const handleChange = e => {
		setInputValue({ ...userInput, [e.target.name]: e.target.value });
	};

	const handleValidInput = (name, value) => {
		setError({ ...error, [name]: undefined });
		setUser({ ...user, [name]: value });
	};

	const checkData = e => {
		e.persist();
		if (e.target.value) {
			axios({
				method: 'get',
				url: 'https://lambda-study-app.herokuapp.com/api/users',
				params: {
					[e.target.name]: e.target.value,
				},
			}).then(({ data }) => {
				if (data) {
					e.target.name === 'username'
						? setError({ ...error, username: 'This username is unavailable.' })
						: setError({
								...error,
								email: 'A user with this email address already exists.',
							});
				} else {
					handleValidInput(e.target.name, e.target.value);
				}
			});
		}
	};

	const comparePasswords = e => {
		e.persist();
		if (e.target.value !== userInput.password) {
			setError({ ...error, password: 'Your passwords do not match' });
		} else {
			handleValidInput('password', e.target.value);
		}
	};

	const handleSubmit = e => {
		e.preventDefault();

		console.log(user);
	};

	return (
		<Wrapper
			handleSubmit={handleSubmit}
			submitDisabled={!userInput.passwordCheck}
			type='register'
			error={serverError}
		>
			<Input
				name='email'
				type='email'
				value={userInput.email}
				handleChange={handleChange}
				placeholder='Please enter your email...'
				handleBlur={checkData}
				error={error.email}
			/>
			<Input
				name='username'
				type='text'
				value={userInput.username}
				handleChange={handleChange}
				placeholder='Please choose a username...'
				handleBlur={checkData}
				error={error.username}
			/>
			<Input
				name='password'
				type='password'
				value={userInput.password}
				handleChange={handleChange}
				placeholder='Please choose a password...'
			/>
			<Input
				name='passwordCheck'
				type='password'
				value={userInput.passwordCheck}
				handleChange={handleChange}
				placeholder='Please reenter your password...'
				disabled={!userInput.password}
				handleBlur={comparePasswords}
				error={error.password}
			/>
		</Wrapper>
	);
};

const mapStateToProps = ({ authReducer }) => ({
	serverError: authReducer.error,
});

export default connect(mapStateToProps, { register })(Register);
