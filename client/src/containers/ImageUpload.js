import React, { useState, useEffect, Fragment, useContext } from 'react';
import { CloudinaryContext } from 'cloudinary-react';
import { openUploadWidget } from '../utils/cloudinary';
import server from '../utils/server';
import { UserCtx } from '../App';
import { LargeImage } from '../components/Styles/Image';
import Button from '../components/Styles/Button';

const UploadImage = ({ doneEditting }) => {
	const [ user, setUser ] = useContext(UserCtx);
	const [ img_url, setImg ] = useState(null);

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
		let userData = JSON.parse(localStorage.getItem('user'));
		if (img_url) {
			server
				.patch('/auth/update', { newImg: img_url })
				.then(response => {
					server
						.get(`/users/${user.id}`)
						.then(({ data }) => {
							let newUser = { ...userData, user: data };
							localStorage.setItem('user', JSON.stringify(newUser));
							setUser(data);
						})
						.then(() => doneEditting());
				})
				.catch(err => console.log(err));
		} else doneEditting();
	};

	return (
		<CloudinaryContext>
			<div style={{ position: 'relative' }}>
				<LargeImage src={img_url} />
				<h4 style={{ textAlign: 'center' }}>Update Profile Picture</h4>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<Button secondary label='Browse...' onClick={handleUpload} />
					<Button secondary label={img_url ? 'done' : 'skip'} onClick={handleEditUser} />
				</div>
			</div>
		</CloudinaryContext>
	);
};

export default UploadImage;
