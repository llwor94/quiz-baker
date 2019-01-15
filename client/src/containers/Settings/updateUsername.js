import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';

import debounce from 'lodash/debounce';
import server from '../../utils/server';
import Button from '../../components/Styles/Button';
import { getUser } from '../../store/actions/authActions';
import { Input } from '../../components/Styles/Input';

const checkData = debounce(async (username, setError) => {
	if (username) {
		let user = await server.get('/users', { params: { username } });

		if (user.data) {
			setError('This username is unavailable.');
		} else if (4 <= username.length >= 10) {
			setError('Username must be between 4 and 10 characters.');
		} else {
			setError(undefined);
		}
	}
}, 500);

const UpdateUsername = ({ user, getUser }) => {
	const [ usernameUpdate, setUsernameUpdate ] = useState(false);
	const [ username, setUsername ] = useState(user.username);
	const [ error, setError ] = useState(undefined);

	const handleChange = async e => {
		e.persist();
		setUsername(e.target.value);
		if (e.target.value !== user.username) {
			await checkData(e.target.value, setError);
		}
	};

	const handleUpdate = () => {
		server
			.patch('/auth/update', { newUsername: username })
			.then(response => {
				getUser(user.id);
				setUsernameUpdate(false);
			})
			.catch(err => console.log(err));
	};

	if (usernameUpdate)
		return (
			<div>
				<Input value={username} onChange={handleChange} />
				{error && <p>{error}</p>}
				<Button secondary
					label='Update'
					disabled={!username || error || username === user.username}
					onClick={handleUpdate}
				/>
				<Button secondary icon='pi pi-times' onClick={() => setUsernameUpdate(false)} />
			</div>
		);
	else return <Button secondary label='Update Username?' onClick={() => setUsernameUpdate(true)} />;
};
const mapStateToProps = ({ authReducer }) => ({
	user: authReducer.user,
});

export default connect(mapStateToProps, { getUser })(UpdateUsername);
