import React, { useEffect, useState, useContext } from 'react';

import server from '../../utils/server';
import { LargeImage } from '../../Styles/Components/Image';
import { Button, SettingsButton } from '../../Styles/Components/Button';
import { ProfileWrapper, ProfileButtonWrapper } from '../../Styles/Settings/Sidebar';
import { UserCtx } from '../../App';
import UpdateImage from './UpdateImage';
import UpdateUsername from './updateUsername';

const Sidebar = () => {
	const [ imageUpdate, setImageUpdate ] = useState(false);
	const [ usernameUpdate, setUsernameUpdate ] = useState(false);
	const [ img_url, setImg ] = useState(null);
	const [ user, setUser ] = useContext(UserCtx);
	useEffect(() => {
		if (user.img_url) {
			setImg(user.img_url);
		}
	}, []);

	const updateUser = () => {
		let userData = JSON.parse(localStorage.getItem('user'));
		server.get(`/users/${user.id}`).then(({ data }) => {
			let newUser = { ...userData, user: data };
			localStorage.setItem('user', JSON.stringify(newUser));
			setUser(data);
			setUsernameUpdate(false);
			setImageUpdate(false);
		});
	};
	return (
		<ProfileWrapper>
			<LargeImage src={user.img_url} />
			<h4>Welcome, {user.username}!</h4>
			<ProfileButtonWrapper>
				{!usernameUpdate && (
					<UpdateImage
						imageUpdate={imageUpdate}
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

export default Sidebar;
