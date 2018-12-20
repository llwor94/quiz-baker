import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';
import debounce from 'lodash/debounce';

import { register } from '../store/actions/authActions';
import { Wrapper, Input } from '../components/Auth';

const checkData = debounce(async ({ target: { name, value } }) => {
	console.log(props.setError);
	if (value) {
		let user = await axios({
			method: 'get',
			url: 'https://lambda-study-app.herokuapp.com/api/users',
			params: {
				[name]: value,
			},
		});
		return user;
		// if (user) {
		// 	name === 'username'
		// 		? props.setError({ ...props.error, username: 'This username is unavailable.' })
		// 		: props.setError({
		// 				...props.error,
		// 				email: 'A user with this email address already exists.',
		// 			});
		// }
	}
}, 1200);

const Register = ({ register, serverError }) => {
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

	const handleChange = e => {
		e.persist();
		setInputValue({ ...userInput, [e.target.name]: e.target.value });
		checkData(e);
	};

	// const checkData = e => {
	// 	e.persist();
	// 	if (e.target.value) {
	// 		axios({
	// 			method: 'get',
	// 			url: 'https://lambda-study-app.herokuapp.com/api/users',
	// 			params: {
	// 				[e.target.name]: e.target.value,
	// 			},
	// 		}).then(({ data }) => {
	// 			if (data) {
	// 				e.target.name === 'username'
	// 					? setError({ ...error, username: 'This username is unavailable.' })
	// 					: setError({
	// 							...error,
	// 							email: 'A user with this email address already exists.',
	// 						});
	// 			} else {
	// 				setError({ ...error, [e.target.name]: undefined });
	// 			}
	// 		});
	// 	}
	// };

	const comparePasswords = e => {
		e.persist();
		if (e.target.value !== userInput.password) {
			setError({ ...error, password: 'Your passwords do not match' });
		} else {
			setError({ ...error, password: undefined });
		}
	};

	const handleSubmit = e => {
		e.preventDefault();
		console.log(userInput);
		//register(user);
	};

	return (
		<Wrapper
			type='register'
			handleSubmit={handleSubmit}
			submitDisabled={_.some(userInput, _.isEmpty) || _.every(error, _.isEmpty)}
			error={serverError}
		>
			<Input
				name='email'
				type='email'
				value={userInput.email}
				handleChange={handleChange}
				placeholder='Please enter your email...'
				error={error.email}
			/>
			<Input
				name='username'
				type='text'
				value={userInput.username}
				handleChange={e => handleChange(e.target)}
				placeholder='Please choose a username...'
				error={error.username}
			/>
			<Input
				name='password'
				type='password'
				value={userInput.password}
				handleChange={e => handleChange(e.target)}
				placeholder='Please choose a password...'
			/>
			<Input
				name='passwordCheck'
				type='password'
				value={userInput.passwordCheck}
				handleChange={e => handleChange(e.target)}
				placeholder='Please reenter your password...'
				handleBlur={comparePasswords}
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
