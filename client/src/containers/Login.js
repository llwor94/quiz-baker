import React, { useState } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { login } from '../store/actions/authActions';
import { Wrapper, Input } from '../components/Auth';

const Login = ({ login }) => {
	const [ user, setValue ] = useState({
		email: undefined,
		password: undefined,
	});

	const [ error, setError ] = useState(null);

	const handleChange = e => {
		setValue({ ...user, [e.target.name]: e.target.value });
	};

	const handleSubmit = e => {
		e.preventDefault();
		if (_.some(user, _.isEmpty)) setError('Please complete all of the required fields');
		login(user);
	};

	return (
		<Wrapper handleSubmit={handleSubmit} type='login'>
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

export default connect(null, { login })(Login);
