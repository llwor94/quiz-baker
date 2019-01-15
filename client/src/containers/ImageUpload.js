import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { CloudinaryContext } from 'cloudinary-react';
import { openUploadWidget } from '../utils/cloudinary';
import server from '../utils/server';
import { getUser } from '../store/actions/authActions';
import { QuestWrapper } from '../components/Styles/Wrappers/index';
import { LargeImage } from '../components/Styles/Image';
import Button from '../components/Styles/Button';
import styled from 'styled-components';

const Input = styled.input`
	width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
`;
const Label = styled.label`
	font-size: 1.25em;
	font-weight: 700;
	color: white;
	background-color: black;
	display: inline-block;
`;

const UploadImage = ({ user, doneEditting, children }) => {
	const [ img_url, setImg ] = useState(null);

	useEffect(() => {
		if (user.img_url) {
			setImg(user.img_url);
		}
	}, []);

	const handleUpload = () => {
		const uploadOptions = {
			cropping: true,
			sources: [ 'local', 'url', 'camera' ],
			multiple: false,
			croppingAspectRatio: 1,
			theme: 'white',
			gravity: 'custom',
		};
		openUploadWidget(uploadOptions, (error, photo) => {
			if (!error) {
				console.log(photo);
				setImg(photo[0].secure_url);
			} else {
				console.log(error);
			}
		});
	};
	console.log(img_url);

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
