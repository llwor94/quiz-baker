import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import server from '../../utils/server';
import blankProfile from '../../assets/blank-profile.png';
import { getUser } from '../../store/actions/authActions';

const Settings = ({ user, getUser }) => {
	useEffect(() => {
		getUser(user.id);
	}, []);
	return (
		<div>
			<img src={user.img_url ? user.img_url : blankProfile} />
			<div>Welcome, {user.username}!</div>
		</div>
	);
};

const mapStateToProps = ({ authReducer }) => ({
	user: authReducer.user,
});

export default connect(mapStateToProps, { getUser })(Settings);
