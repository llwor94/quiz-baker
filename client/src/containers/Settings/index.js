import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import server from '../../utils/server';
import blankProfile from '../../assets/blank-profile.png';
import { getUser } from '../../store/actions/authActions';
import UploadImage from '../Register/uploadImage';
import { Button } from 'primereact/button';

const Settings = ({ user, getUser }) => {
	const [ imageUpdate, setImageUpdate ] = useState(false);
	useEffect(() => {
		getUser(user.id);
	}, []);
	if (imageUpdate) return <UploadImage doneEditting={() => setImageUpdate(false)} />;
	else
		return (
			<div>
				<img src={user.img_url ? user.img_url : blankProfile} />
				<Button label='Update Image?' onClick={setImageUpdate} />
				<div>Welcome, {user.username}!</div>
			</div>
		);
};

const mapStateToProps = ({ authReducer }) => ({
	user: authReducer.user,
});

export default connect(mapStateToProps, { getUser })(Settings);
