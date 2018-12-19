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

	const handleChange = e => {
		setValue({ ...user, [e.target.name]: e.target.value });
	};

	const handleSubmit = () => {
		console.log(_.some(user, undefined));
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
		</Wrapper>
	);
};

export default connect(null, { register })(Register);
