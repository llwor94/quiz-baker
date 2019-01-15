import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import server from '../../utils/server';

import { getUser } from '../../store/actions/authActions';
import ImageUpload from '../ImageUpload';
import Button from '../../components/Styles/Button';
import { LargeImage } from '../../components/Styles/Image';
import UpdateUsername from './updateUsername';

const Settings = ({ user, getUser, ...props }) => {
	const [ imageUpdate, setImageUpdate ] = useState(false);

	useEffect(() => {
		getUser(user.id);
	}, []);
	if (imageUpdate)
		return (
			<ImageUpload doneEditting={() => setImageUpdate(false)} {...props}>
				<Button
					icon='pi pi-arrow-left'
					label='back'
					onClick={() => setImageUpdate(false)}
				/>
			</ImageUpload>
		);
	else
		return (
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div>Welcome, {user.username}!</div>

				<LargeImage src={user.img_url} />
				<Button label='Update Image?' onClick={() => setImageUpdate(true)} />

				<UpdateUsername />
			</div>
		);
};

const mapStateToProps = ({ authReducer }) => ({
	user: authReducer.user,
});

export default connect(mapStateToProps, { getUser })(Settings);
