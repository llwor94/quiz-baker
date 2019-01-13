import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';

import { checkUser } from '../store/actions/authActions';
import SettingsContainer from '../containers/Settings/index';

const Settings = ({ user, checkUser }) => {
	useEffect(() => {
		checkUser();
	}, []);
	if (!user) return <div>Loading...</div>;
	else
		return (
			<div>
				<SettingsContainer />
			</div>
		);
};

const mapStateToProps = ({ authReducer }) => ({
	user: authReducer.user,
});

export default connect(mapStateToProps, { checkUser })(Settings);
