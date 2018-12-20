import React, { useState } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { register } from '../store/actions/authActions';
import { Wrapper, Input } from '../components/Auth';

const Register = ({ register }) => {
	const [ user, setValue ] = useState({
		username: undefined,
		email: undefined,
		password: undefined,
	});

	const [ error, setError ] = useState(null);

	const handleChange = e => {
		setValue({ ...user, [e.target.name]: e.target.value });
	};

	const handleSubmit = () => {
		if (_.some(user, _.isEmpty)) setError('Please complete all of the required fields');
	};

	return (
		<Wrapper onsubmit={handleSubmit} type='register'>
			<Input
				name='username'
				type='text'
				value={user.username}
				handleChange={handleChange}
				placeholder='Please choose a username...'
			/>
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
				placeholder='Please choose a password...'
			/>
			{error && <p>{error}</p>}
		</Wrapper>
	);
};

export default connect(null, { register })(Register);
