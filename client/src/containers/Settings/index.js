import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import server from '../../utils/server';
import blankProfile from '../../assets/blank-profile.png';
import { getUser } from '../../store/actions/authActions';
import UploadImage from '../Register/uploadImage';
import Button from '../../components/Styles/Button';
import UpdateUsername from './updateUsername';

const Settings = ({ user, getUser }) => {
	const [ imageUpdate, setImageUpdate ] = useState(false);

	useEffect(() => {
		getUser(user.id);
	}, []);
	if (imageUpdate) return <UploadImage doneEditting={() => setImageUpdate(false)} />;
	else
		return (
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div>Welcome, {user.username}!</div>
				<img
					src={user.img_url ? user.img_url : blankProfile}
					style={{ width: '300px', height: '300px', borderRadius: '50%' }}
				/>
				<Button label='Update Image?' onClick={() => setImageUpdate(true)} />
				<UpdateUsername />
			</div>
		);
};

const mapStateToProps = ({ authReducer }) => ({
	user: authReducer.user,
});

export default connect(mapStateToProps, { getUser })(Settings);
