import React, { useEffect, useState, useContext } from 'react';
import { openUploadWidget } from '../../utils/cloudinary';
import { Button, SettingsButton } from '../../Styles/Components/Button';
import {ProfileButtonWrapper} from '../../Styles/Settings/Sidebar';

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
			<ProfileButtonWrapper>
				<Button
					style={{marginBottom: '5px'}}
					secondary
					icon='pi pi-arrow-left'
					label='back'
					onClick={() => setImageUpdate(false)}
				/>
				<Button secondary label='Browse...' onClick={handleUpload} />
			</ProfileButtonWrapper>
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
