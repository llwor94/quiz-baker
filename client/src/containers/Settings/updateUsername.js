import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import server from '../../utils/server';
import Button from '../../components/Styles/Button';
import { getUser } from '../../store/actions/authActions';
import { InputText } from 'primereact/inputtext';

const UpdateUsername = ({ user }) => {
	const [ usernameUpdate, setUsernameUpdate ] = useState(false);
	const [ username, setUsername ] = useState(user.username);

	if (usernameUpdate)
		return (
			<div>
				<InputText value={username} onChange={e => setUsername(e.target.value)} />
				<Button label='Update' />
			</div>
		);
	else return <Button label='Update Username?' onClick={() => setUsernameUpdate(true)} />;
};
const mapStateToProps = ({ authReducer }) => ({
	user: authReducer.user,
});

export default connect(mapStateToProps, { getUser })(UpdateUsername);
