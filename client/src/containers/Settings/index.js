import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import server from '../../utils/server';

import { getUser } from '../../store/actions/authActions';
import ImageUpload from '../ImageUpload';
import Button from '../../components/Styles/Button';
import { LargeImage } from '../../components/Styles/Image';
import UpdateUsername from './updateUsername';

const Settings = ({ user, getUser }) => {
	const [ imageUpdate, setImageUpdate ] = useState(false);

	useEffect(() => {
		getUser(user.id);
	}, []);
	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<div>Welcome, {user.username}!</div>
			{imageUpdate ? (
				<ImageUpload doneEditting={() => setImageUpdate(false)}>
					<Button
						icon='pi pi-times'
						style={{ position: 'absolute', top: '5px', right: '5px' }}
						onClick={() => setImageUpdate(false)}
					/>
				</ImageUpload>
			) : (
				<Fragment>
					<LargeImage src={user.img_url} />
					<Button label='Update Image?' onClick={() => setImageUpdate(true)} />
				</Fragment>
			)}

			<UpdateUsername />
		</div>
	);
};

const mapStateToProps = ({ authReducer }) => ({
	user: authReducer.user,
});

export default connect(mapStateToProps, { getUser })(Settings);
