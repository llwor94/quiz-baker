import React, { useEffect, useState, useContext } from 'react';

import server from '../../utils/server';
import { LargeImage } from '../../Styles/Components/Image';
import { Button, SettingsButton } from '../../Styles/Components/Button';
import {
	ProfileWrapper,
	ProfileButtonWrapper,
	ButtonCollapse,
} from '../../Styles/Settings/Sidebar';
import { AuthCtx } from '../../Auth';
import { Transition } from 'react-transition-group';

import anime from 'animejs';

import UpdateImage from './UpdateImage';
import UpdateUsername from './updateUsername';
import MediaQuery from 'react-responsive';

// const animateButtonsOut = buttons =>
// 	anime({ targets: buttons, visibilty: 'hidden', translateX: 0 });

// const animateButtonsIn = buttons => anime({ targets: buttons, translateX: 220 });
// const transitionStyles = {
// 	entering: { visibility: 'hidden' },
// 	entered: { visibility: 'hidden' },
// 	exiting: { visibility: 'hidden' },
// 	exited: { visibility: 'visible' },
// };

const Profile = () => {
	const [ imageUpdate, setImageUpdate ] = useState(false);
	const [ usernameUpdate, setUsernameUpdate ] = useState(false);
	const [ img_url, setImg ] = useState(null);
	const { user, editUser } = useContext(AuthCtx);

	useEffect(() => {
		if (user.img_url) {
			setImg(user.img_url);
		}
	}, []);

	// useEffect(
	// 	() => {
	// 		buttonRef = anime({
	// 			targets: buttonRef.current,
	// 			translateX: () => {
	// 				if (buttonsHiding === false) {
	// 					return [ '100%', '0%' ];
	// 				} else if (buttonsHiding === true) {
	// 					return [ '0%', '100%' ];
	// 				}
	// 			},
	// 			opacity: () => {
	// 				if (buttonsHiding === false) {
	// 					return [ '0', '1' ];
	// 				} else if (buttonsHiding === true) {
	// 					return [ '1', '0' ];
	// 				}
	// 			},
	// 			easing: 'easeInOutExpo',
	// 		});
	// 	},
	// 	[ buttonsHiding ],
	// );

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
				<a className='tab'>
					<span>Your Quizzes</span>
				</a>
				<a className='tab'>
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
