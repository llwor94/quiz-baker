import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { login } from '../store/actions/authActions';
import { Wrapper, Input } from '../components/Auth';

const Login = ({ login, serverError, user, ...props }) => {
	const [ userInput, setValue ] = useState({
		email: undefined,
		password: undefined,
	});

	const [ error, setError ] = useState(undefined);

	useEffect(
		() => {
			if (user) {
				props.history.push('/quizzes');
			}
		},
		[ user ],
	);

	useEffect(
		() => {
			if (serverError) setError('Your email or password is incorrect.');
		},
		[ serverError ],
	);

	const handleChange = e => {
		setValue({ ...userInput, [e.target.name]: e.target.value });
		setError(undefined);
	};

	const handleSubmit = e => {
		e.preventDefault();
		login(userInput);
	};

	return (
		<Wrapper
			type='login'
			handleSubmit={handleSubmit}
			submitDisabled={_.some(userInput, _.isEmpty)}
			error={error}
			location={props.location}
		>
			<Input
				name='email'
				type='email'
				value={userInput.email}
				handleChange={handleChange}
				placeholder='Email'
			/>
			<Input
				name='password'
				type='password'
				value={userInput.password}
				handleChange={handleChange}
				placeholder='Password'
			/>
		</Wrapper>
	);
};

const mapStateToProps = ({ authReducer }) => ({
	serverError: authReducer.error,
	user: authReducer.user,
});

export default connect(mapStateToProps, { login })(Login);
