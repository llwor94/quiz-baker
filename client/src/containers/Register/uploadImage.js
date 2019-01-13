import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import blankProfile from '../../assets/blank-profile.png';
import server from '../../utils/server';
import { getUser } from '../../store/actions/authActions';
import { QuestWrapper } from '../../components/Styles/Wrappers/index';
import { Button } from 'primereact/button';
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

const ProfileImage = styled.img`
	height: 300px;
	width: 300px;
	border-radius: 50%;
`;

const UploadImage = ({ user, getUser, doneEditting }) => {
	const [ img_url, setImg ] = useState(null);

	useEffect(() => {
		if (user.img_url) {
			setImg(user.img_url);
		}
	}, []);

	const handleUploadFile = async e => {
		const files = e.target.files;
		const data = new FormData();
		data.append('file', files[0]);
		data.append('upload_preset', 'quizbaker');

		const res = await fetch('https://api.cloudinary.com/v1_1/dcwn6afsq/image/upload', {
			method: 'POST',
			body: data,
		});
		const file = await res.json();
		console.log(file);
		setImg(file.secure_url);
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
		}
	};

	return (
		<Fragment>
			<QuestWrapper>
				<div>Set a profile image?</div>
				<ProfileImage src={img_url ? img_url : blankProfile} />

				<Label for='file'>Choose a file</Label>
				<Input
					type='file'
					id='file'
					name='file'
					placeholder={img_url ? 'Choose a different Image' : 'Upload an Image'}
					accept='image/*'
					onChange={handleUploadFile}
				/>
			</QuestWrapper>
			<Button label={img_url ? 'done' : 'skip'} onClick={handleEditUser} />
		</Fragment>
	);
};

const mapStateToProps = ({ authReducer }) => ({
	user: authReducer.user,
});

export default connect(mapStateToProps, { getUser })(UploadImage);
