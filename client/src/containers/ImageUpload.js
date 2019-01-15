import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { CloudinaryContext } from 'cloudinary-react';
import { openUploadWidget } from '../utils/cloudinary';
import server from '../utils/server';
import { getUser } from '../store/actions/authActions';
import { QuestWrapper } from '../components/Styles/Wrappers/index';
import { LargeImage } from '../components/Styles/Image';
import Button from '../components/Styles/Button';

const UploadImage = ({ user, doneEditting, children }) => {
	const [ img_url, setImg ] = useState(null);

	useEffect(() => {
		if (user.img_url) {
			setImg(user.img_url);
		}
	}, []);

	useEffect(
		() => {
			if (user.img_url) {
				setImg(user.img_url);
			}
		},
		[ user.img_url ],
	);

	const handleUpload = () => {
		const uploadOptions = {
			cropping: true,
			sources: [ 'local', 'url', 'camera' ],
			multiple: false,
			croppingAspectRatio: 1,
			gravity: 'custom',
			croppingShowBackButton: false,
		};
		openUploadWidget(uploadOptions, (error, result) => {
			if (result.event === 'success') {
				console.log(result.info);
				setImg(result.info.secure_url);
			}
		});
	};

	const handleEditUser = () => {
		if (img_url) {
			server
				.patch('/auth/update', { newImg: img_url })
				.then(response => {
					getUser(user.id);
					doneEditting();
				})
				.catch(err => console.log(err));
		} else doneEditting();
	};

	return (
		<CloudinaryContext>
			<div style={{ position: 'relative' }}>
				{children && children}
				<QuestWrapper>
					<LargeImage src={img_url} />
					<Button label='Upload Image?' onClick={handleUpload} />

					<Button label={img_url ? 'done' : 'skip'} onClick={handleEditUser} />
				</QuestWrapper>
			</div>
		</CloudinaryContext>
	);
};

const mapStateToProps = ({ authReducer }) => ({
	user: authReducer.user,
});

export default connect(mapStateToProps, { getUser })(UploadImage);
