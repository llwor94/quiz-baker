import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { login } from '../store/actions/authActions';
import { Wrapper, Input } from '../components/Auth';

const Login = ({ login, serverError }) => {
	const [ user, setValue ] = useState({
		email: undefined,
		password: undefined,
	});

	const [ error, setError ] = useState(null);

	useEffect(
		() => {
			if (serverError) setError('Your email or password is incorrect.');
		},
		[ serverError ],
	);

	const handleChange = e => {
		setValue({ ...user, [e.target.name]: e.target.value });
		setError(null);
	};

	const handleSubmit = e => {
		e.preventDefault();
		if (_.some(user, _.isEmpty)) setError('Please complete all of the required fields');
		else login(user);
	};

	return (
		<Wrapper handleSubmit={handleSubmit} submitDisabled={_.some(user, _.isEmpty)} type='login'>
			<Input
				name='email'
				type='email'
				value={user.email}
				handleChange={handleChange}
				placeholder='Please enter your email...'
			/>
			<Input
				name='password'
				type='password'
				value={user.password}
				handleChange={handleChange}
				placeholder='Please enter your password...'
			/>

			{error && <p>{error}</p>}
		</Wrapper>
	);
};

const mapStateToProps = ({ authReducer }) => ({
	serverError: authReducer.error,
});

export default connect(mapStateToProps, { login })(Login);
