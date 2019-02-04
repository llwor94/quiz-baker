import React, { useState, useContext } from 'react';
import MediaQuery from 'react-responsive';

import server from 'server';

import { AuthCtx } from 'auth';

import UpdateImage from './UpdateImage';
import UpdateUsername from './updateUsername';

import { LargeImage } from 'styles/Components/Image';
import { ProfileWrapper, ProfileButtonWrapper } from 'styles/Settings/Sidebar';

const Profile = ({ setActiveTab }) => {
	const [ imageUpdate, setImageUpdate ] = useState(false);
	const [ usernameUpdate, setUsernameUpdate ] = useState(false);
	const { user, editUser } = useContext(AuthCtx);

	const updateUser = () => {
		let userData = JSON.parse(localStorage.getItem('user'));
		server.get(`/users/${user.id}`).then(({ data }) => {
			let newUser = { ...userData, user: data };
			editUser(newUser);
			setUsernameUpdate(false);
			setImageUpdate(false);
		});
	};

	return (
		<ProfileWrapper>
			<MediaQuery maxWidth={800}>
				<a href='#quizzes' className='tab' onClick={() => setActiveTab('quizzes')}>
					<span>Your Quizzes</span>
				</a>
				<a href='#posts' className='tab' onClick={() => setActiveTab('posts')}>
					<span>Your Posts</span>
				</a>
			</MediaQuery>
			<LargeImage src={user.img_url} />

			<h4>{user.username}</h4>
			<ProfileButtonWrapper>
				{!usernameUpdate && (
					<UpdateImage
						imageUpdate={imageUpdate}
						appear
						setImageUpdate={setImageUpdate}
						updateUser={updateUser}
					/>
				)}
				{!imageUpdate && (
					<UpdateUsername
						usernameUpdate={usernameUpdate}
						setUsernameUpdate={setUsernameUpdate}
						updateUser={updateUser}
					/>
				)}
			</ProfileButtonWrapper>
		</ProfileWrapper>
	);
};

export default Profile;
