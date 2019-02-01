import React, { useState, useEffect, useContext, Fragment } from 'react';
import { AuthCtx } from '../Auth';
import styled from 'styled-components';
import MediaQuery from 'react-responsive';
import { Link, withRouter } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import { InputSwitch } from 'primereact/inputswitch';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import anime from 'animejs';

import quizbaker from '../assets/quizbaker.png';
import darkModeLogo from '../assets/logo-darkmode.png';

const Wrapper = styled.div`
	position: fixed;
	width: 100%;
	z-index: 100;
	display: flex;
	align-items: center;
	z-index: 1052;

	.sidebarButton {
		background: ${props => props.theme.pink};
		border-color: ${props => props.theme.pink};
	}
	.p-button:enabled:hover {
		background: ${props => props.theme.darkPink};
		border-color: ${props => props.theme.darkPink};
	}
	.sidebar {
		top: 49px;
		width: 130px;
		display: flex;
		flex-direction: column;
		align-items: center;
		height: auto;
		right: 10px;
		transform: translateX(110%);
	}
	.sidebar.p-sidebar-active {
		transform: translateX(0);
	}
	.p-sidebar .p-sidebar-close {
		display: none;
	}
`;

const HeaderWrapper = styled.div`
	height: 55px;
	position: relative;
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: space-between;
	background-color: ${props => props.theme.secondary};
	padding: 0 10px;
	top: 0;
	z-index: 1047;
	box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.3);
	.p-inputswitch.p-inputswitch-checked .p-inputswitch-slider {
		background-color: ${props => props.theme.main};
	}
	.p-inputswitch .p-inputswitch-slider:before {
		background-color: ${props => props.theme.pink};
	}
	.p-inputswitch.p-inputswitch-checked:not(.p-disabled):hover .p-inputswitch-slider {
		background-color: ${props => props.theme.secondary};
	}
`;

const InnerWrapper = styled.div`
	display: flex;
	border-bottom: ${props => props.menu && '1px solid'};
	border-bottom-color: ${props => props.menu && props.theme.accent};
	width: ${props => (props.menu ? '100%' : '700px')};
	position: absolute;
	justify-content: center;
	left: 0;
	right: 0;
	margin: 0 auto;
`;

const LeftHeader = styled.div`margin-left: 20px;`;

const LinkWrapper = styled.div`
	margin: 0 35px;
	width: 70px;
	text-align: center;
	height: 35px;
`;

const StyledHeader = styled(Link)`
font-size: 20px;
  font-family: 'Merienda One', cursive;
  color: ${props => props.theme.pink};
	z-index: 200;
	span {
		color:${props => props.theme.aqua};
		font-family: 'Merienda One', cursive;
	}
  &:hover{
	  color:${props => props.theme.aqua};
		span {
			color: ${props => props.theme.pink}
		}
		
  }
`;

const StyledLink = styled(Link)`
  font-family: 'Merienda One', cursive;
  text-transform: capitalize;
  background-color: ${props => props.theme.secondary};
	color: ${props => props.theme.text};
	font-size: 15px;
	line-height: 30px;
	transition: all .7s ease-in-out;
	cursor: pointer;
	
	&:hover {
		color: ${props => props.theme.aqua};
		font-size: 17px;
	}
`;

const Logo = styled.img`
	z-index: 1000;
	width: 45px;
	height: 45px;
	background-color: ${props => props.dark && props.theme.secondary};
`;

const animateLogoUp = logo => anime({ targets: logo, scale: 3, translateY: 4 });
const animateLogoDown = logo => anime({ targets: logo, scale: 1, translateY: 0 });
const animateMenuUp = menu => anime({ targets: menu, translateY: 90 });
const animateMenuDown = menu => anime({ targets: menu, translateY: 0 });
const animateLinkUp = link => anime({ targets: link, translateY: -25, translateX: 125 });
const animateLinkDown = link => anime({ targets: link, translateY: 0, translateX: 0 });
const animateSecondLinkUp = link => anime({ targets: link, translateY: -25 });
const animateSecondLinkDown = link => anime({ targets: link, translateY: 0 });
const animateThirdLinkUp = link => anime({ targets: link, translateX: -125 });
const animateThirdLinkDown = link => anime({ targets: link, translateX: 0 });

const listenScrollEvent = (setMenuShowing, location) => {
	if (window.scrollY < 50 && location) {
		setMenuShowing(true);
	} else {
		setMenuShowing(false);
	}
};
const Header = ({ setValue, darkMode, ...props }) => {
	const { user, logout } = useContext(AuthCtx);
	const [ menuShowing, setMenuShowing ] = useState(
		props.history.location.pathname === '/quizzes',
	);
	const [ sidebarShowing, setSidebarShowing ] = useState(false);

	useEffect(
		() => {
			if (props.history.location.pathname === '/quizzes') {
				setMenuShowing(true);
				window.addEventListener('scroll', () =>
					listenScrollEvent(
						setMenuShowing,
						props.history.location.pathname === '/quizzes',
					),
				);
			} else {
				setMenuShowing(false);
				window.removeEventListener('scroll', () =>
					listenScrollEvent(
						setMenuShowing,
						props.history.location.pathname === '/quizzes',
					),
				);
			}
		},
		[ props.history.location.pathname ],
	);

	return (
		<Wrapper>
			<HeaderWrapper>
				<LeftHeader>
					<StyledHeader to='/'>
						Quiz <span> Baker</span>
					</StyledHeader>
				</LeftHeader>
				<MediaQuery minWidth={915}>
					<Transition
						in={menuShowing}
						appear
						onExit={animateMenuDown}
						onEnter={animateMenuUp}
					>
						<InnerWrapper menu={menuShowing}>
							<div
								style={{
									marginRight: '40px',
									display: 'flex',
									alignItems: 'center',
								}}
							>
								<Transition
									in={menuShowing}
									appear
									onExit={animateLinkDown}
									onEnter={animateLinkUp}
								>
									<LinkWrapper>
										<StyledLink to='/quizzes'>Quizzes</StyledLink>
									</LinkWrapper>
								</Transition>
								<LinkWrapper>
									<StyledLink to='/forum'>Forum</StyledLink>
								</LinkWrapper>
							</div>
							<Transition
								in={menuShowing}
								appear
								onExit={animateLogoDown}
								onEnter={animateLogoUp}
							>
								<Logo dark={darkMode} src={darkMode ? darkModeLogo : quizbaker} />
							</Transition>
							{user ? (
								<div
									style={{
										marginLeft: '40px',
										display: 'flex',
										alignItems: 'center',
									}}
								>
									<Transition
										in={menuShowing}
										appear
										onExit={animateSecondLinkDown}
										onEnter={animateSecondLinkUp}
									>
										<LinkWrapper>
											<StyledLink to='/user/settings'>
												{user.username}
											</StyledLink>
										</LinkWrapper>
									</Transition>
									<Transition
										in={menuShowing}
										appear
										onExit={animateThirdLinkDown}
										onEnter={animateThirdLinkUp}
									>
										<LinkWrapper>
											<StyledLink
												as='a'
												onClick={() => {
													logout();
													props.history.push('/quizzes');
												}}
											>
												logout
											</StyledLink>
										</LinkWrapper>
									</Transition>
								</div>
							) : (
								<div
									style={{
										marginLeft: '40px',
										display: 'flex',
										alignItems: 'center',
									}}
								>
									<Transition
										in={menuShowing}
										appear
										onExit={animateSecondLinkDown}
										onEnter={animateSecondLinkUp}
									>
										<LinkWrapper>
											<StyledLink to='/login'>Log In</StyledLink>
										</LinkWrapper>
									</Transition>
									<Transition
										in={menuShowing}
										appear
										onExit={animateThirdLinkDown}
										onEnter={animateThirdLinkUp}
									>
										<LinkWrapper>
											{' '}
											<StyledLink to='/register'>Sign Up</StyledLink>
										</LinkWrapper>
									</Transition>
								</div>
							)}
						</InnerWrapper>
					</Transition>

					<InputSwitch
						style={{ marginRight: '20px' }}
						onLabel='Dark Mode'
						offLabel='Light Mode'
						checked={darkMode}
						onChange={e => setValue(e.value)}
					/>
				</MediaQuery>
				<MediaQuery maxWidth={915}>
					<Button
						className='sidebarButton'
						icon={sidebarShowing ? 'pi pi-times' : 'pi pi-bars'}
						onClick={() => setSidebarShowing(!sidebarShowing)}
					/>
					<Sidebar
						visible={sidebarShowing}
						position='right'
						className='sidebar'
						onHide={() => setSidebarShowing(false)}
						modal={false}
					>
						<Logo dark={darkMode} src={darkMode ? darkModeLogo : quizbaker} />
						<StyledLink to='/quizzes'>Quizzes</StyledLink>
						<StyledLink to='/forum'>Forum</StyledLink>
						{user ? (
							<Fragment>
								<StyledLink to='/user/settings'>{user.username}</StyledLink>
								<StyledLink
									as='a'
									onClick={() => {
										logout();
										props.history.push('/quizzes');
									}}
								>
									logout
								</StyledLink>{' '}
							</Fragment>
						) : (
							<Fragment>
								<StyledLink to='/login'>Log In</StyledLink>
								<StyledLink to='/register'>Sign Up</StyledLink>
							</Fragment>
						)}
					</Sidebar>
				</MediaQuery>
			</HeaderWrapper>
		</Wrapper>
	);
};

export default withRouter(Header);
