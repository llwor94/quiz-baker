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

// const animateButtonsOut = buttons =>
// 	anime({ targets: buttons, visibilty: 'hidden', translateX: 0 });

// const animateButtonsIn = buttons => anime({ targets: buttons, translateX: 220 });
// const transitionStyles = {
// 	entering: { visibility: 'hidden' },
// 	entered: { visibility: 'hidden' },
// 	exiting: { visibility: 'hidden' },
// 	exited: { visibility: 'visible' },
// };

const Sidebar = () => {
	const [ imageUpdate, setImageUpdate ] = useState(false);
	const [ usernameUpdate, setUsernameUpdate ] = useState(false);
	const [ img_url, setImg ] = useState(null);
	const [ user, setUser ] = useContext(UserCtx);

	const [ buttonsHiding, setButtonsShowing ] = useState(true);
	let buttonRef = React.createRef();

	useEffect(() => {
		if (user.img_url) {
			setImg(user.img_url);
		}
	}, []);

	useEffect(
		() => {
			buttonRef = anime({
				targets: buttonRef.current,
				translateX: () => {
					if (buttonsHiding === false) {
						return [ '-100%', '0%' ];
					} else if (buttonsHiding === true) {
						return [ '0%', '100%' ];
					}
				},
				elasticity: () => {
					if (buttonsHiding === false) {
						return 300;
					} else if (buttonsHiding === true) {
						return 0;
					}
				},
			});
		},
		[ buttonsHiding ],
	);

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
				// appear
				onEnter={() => setButtonsShowing(true)}
				onExit={() => setButtonsShowing(false)}
			>
				{state => {
					return (
						<ProfileButtonWrapper
							ref={buttonRef}
							// style={transitionStyles[state]}
						>
							{console.log(state)}
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
				<div style={{ display: 'flex', position: 'relative' }}>
					<ButtonCollapse onClick={() => setButtonsShowing(!buttonsHiding)}>
						<div>···</div>
					</ButtonCollapse>
					<LargeImage src={user.img_url} />
				</div>
				<h4>{user.username}</h4>
			</div>
		</ProfileWrapper>
	);
};

export default Sidebar;
