import React, { useEffect, useState, useContext } from 'react';

import server from '../../utils/server';
import { LargeImage } from '../../Styles/Components/Image';
import { Button, SettingsButton } from '../../Styles/Components/Button';
import {
	ProfileWrapper,
	ProfileButtonWrapper,
	ButtonCollapse,
} from '../../Styles/Settings/Sidebar';
import { UserCtx } from '../../App';
import { Transition } from 'react-transition-group';

import anime from 'animejs';

import UpdateImage from './UpdateImage';
import UpdateUsername from './updateUsername';

const animateButtonsOut = buttons =>
	anime({ targets: buttons, visibilty: 'hidden', translateX: 0 });

const animateButtonsIn = buttons => anime({ targets: buttons, translateX: 220 });
const transitionStyles = {
	entering: { visibility: 'hidden' },
	entered: { visibility: 'hidden' },
	exiting: { visibility: 'hidden' },
	exited: { visibility: 'visible' },
};
const Sidebar = () => {
	const [ imageUpdate, setImageUpdate ] = useState(false);
	const [ usernameUpdate, setUsernameUpdate ] = useState(false);
	const [ img_url, setImg ] = useState(null);
	const [ user, setUser ] = useContext(UserCtx);

	const [ buttonsHiding, setButtonsShowing ] = useState(true);

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
			<Transition
				timeout={100}
				in={buttonsHiding}
				appear
				onEnter={animateButtonsIn}
				onExit={animateButtonsOut}
			>
				{state => {
					console.log(state);
					return (
						<ProfileButtonWrapper style={transitionStyles[state]}>
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
					);
				}}
			</Transition>

			<div>
				<LargeImage src={user.img_url} />
				<div style={{ display: 'flex' }}>
					<Button
						icon={buttonsHiding ? 'pi pi-pencil' : 'pi pi-times'}
						onClick={() => setButtonsShowing(!buttonsHiding)}
					/>
					<h4>{user.username}</h4>
				</div>
			</div>
		</ProfileWrapper>
	);
};

export default Sidebar;
