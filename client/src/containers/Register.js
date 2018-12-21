import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';
import debounce from 'lodash/debounce';

import { register } from '../store/actions/authActions';
import { Wrapper, Input } from '../components/Auth';

const checkData = debounce(async ({ target }, setError, error) => {
	if (target.value) {
		let user = await axios({
			method: 'get',
			url: 'https://lambda-study-app.herokuapp.com/api/users',
			params: {
				[target.name]: target.value,
			},
		});
		if (user.data) {
			target.name === 'username'
				? setError({ ...error, username: 'This username is unavailable.' })
				: setError({
						...error,
						email: 'A user with this email address already exists.',
					});
		} else {
			setError({ ...error, [target.name]: undefined });
		}
	}
}, 500);

const Register = ({ register, serverError, ...props }) => {
	const [ userInput, setInputValue ] = useState({
		username: undefined,
		email: undefined,
		password: undefined,
		passwordCheck: undefined,
	});

	const [ error, setError ] = useState({
		username: undefined,
		email: undefined,
		password: undefined,
	});

	const handleChange = async e => {
		e.persist();
		setInputValue({ ...userInput, [e.target.name]: e.target.value });
		if (e.target.name === 'username' || e.target.name === 'email') {
			await checkData(e, setError, error);
		} else if (e.target.name === 'passwordCheck') {
			if (e.target.value !== userInput.password) {
				setError({ ...error, password: 'Your passwords do not match' });
			} else {
				setError({ ...error, password: undefined });
			}
		}
	};

	const handleSubmit = e => {
		e.preventDefault();
		register(userInput);
	};

	return (
		<Wrapper
			type='register'
			handleSubmit={handleSubmit}
			submitDisabled={_.some(userInput, _.isEmpty) || !_.every(error, _.isEmpty)}
			error={serverError}
			location={props.location}
		>
			<Input
				name='email'
				type='email'
				value={userInput.email}
				handleChange={handleChange}
				placeholder='Email'
				error={error.email}
			/>
			<Input
				name='username'
				type='text'
				value={userInput.username}
				handleChange={handleChange}
				placeholder='Username'
				error={error.username}
			/>
			<Input
				name='password'
				type='password'
				value={userInput.password}
				handleChange={handleChange}
				placeholder='Password'
			/>
			<Input
				name='passwordCheck'
				type='password'
				value={userInput.passwordCheck}
				handleChange={handleChange}
				placeholder='Re-enter password'
				disabled={!userInput.password}
				error={error.password}
			/>
		</Wrapper>
	);
};

const mapStateToProps = ({ authReducer }) => ({
	serverError: authReducer.error,
});

export default connect(mapStateToProps, { register })(Register);
