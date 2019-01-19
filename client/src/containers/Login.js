import React, { useState, useEffect, useContext } from 'react';

import _ from 'lodash';
import { UserCtx } from '../App';
import server from '../utils/server';
import { Wrapper, InputWrap } from '../components/Auth';

const Login = props => {
	const [ user, setUser ] = useContext(UserCtx);
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

	const handleChange = e => {
		setValue({ ...userInput, [e.target.name]: e.target.value });
		setError(undefined);
	};

	const handleSubmit = e => {
		e.preventDefault();
		server
			.post('/auth/login', userInput)
			.then(({ data }) => {
				localStorage.setItem('user', JSON.stringify(data));
				server.defaults.headers.common['Authorization'] = data.token;
				setUser(data.user);
			})
			.catch(err => setError('Your email or password is incorrect'));
	};

	return (
		<Wrapper
			type='login'
			handleSubmit={handleSubmit}
			submitDisabled={_.some(userInput, _.isEmpty)}
			error={error}
			location={props.location}
		>
			<InputWrap
				name='email'
				type='email'
				value={userInput.email}
				handleChange={handleChange}
				placeholder='Email'
			/>
			<InputWrap
				name='password'
				type='password'
				value={userInput.password}
				handleChange={handleChange}
				placeholder='Password'
			/>
		</Wrapper>
	);
};

export default Login;
