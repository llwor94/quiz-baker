import React, { useEffect, useState, useContext } from 'react';
import { openUploadWidget } from '../../utils/cloudinary';
import { Button, SettingsButton } from '../../Styles/Components/Button';

import server from '../../utils/server';
const UpdateImage = ({ imageUpdate, setImageUpdate, updateUser }) => {
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
				server.patch('/auth/update', { newImg: result.info.secure_url }).then(response => {
					updateUser();
				});
			}
		});
	};
	if (imageUpdate)
		return (
			<div>
				<Button
					secondary
					icon='pi pi-arrow-left'
					label='back'
					onClick={() => setImageUpdate(false)}
				/>
				<Button secondary label='Browse...' onClick={handleUpload} />
			</div>
		);
	else
		return (
			<Button
				style={SettingsButton}
				secondary
				label='Update Image?'
				onClick={() => setImageUpdate(true)}
			/>
		);
};

export default UpdateImage;
