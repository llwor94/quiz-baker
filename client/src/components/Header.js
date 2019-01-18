import React, { useState, useEffect, useContext, Fragment } from 'react';
import { UserCtx } from '../App';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import { InputSwitch } from 'primereact/inputswitch';
import anime from 'animejs';

import quizbaker from '../assets/quizbaker.png';

const Wrapper = styled.div`
	position: fixed;
	width: 100%;
	z-index: 100;
`;

const HeaderWrapper = styled.div`
	height: 50px;

	display: flex;
	width: 100%;
	align-items: center;
	justify-content: space-between;
	background-color: ${props => props.theme.secondary};
	padding: 0 10px;
	top: 0;
	z-index: 200;
	box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.3);
`;

const LeftHeader = styled.div`margin-left: 20px;`;

const LinkWrapper = styled.div`
	margin: 0 40px;
	width: 60px;
	text-align: center;
	height: 25px;
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
	transition: all .5s ease-in-out;
	cursor: pointer;
	
	&:hover {
		color: ${props => props.theme.aqua};
		font-size: 17px;
	}
`;

const StyledMenu = styled.div`
	border: .5px solid;
	background-color: transparent;
	border-color: ${props => props.theme.accent};
	display: flex;
	align-items: center;
	justify-content: center;
	height: 85px;
	padding: 12px 25px;

	width: 100%;
	top: 40px;
`;

const Logo = styled.img`
	z-index: 1000;
	width: 150px;
	height: 150px;
	position: absolute;
	top: 0;
`;

const animateLogoUp = logo => anime({ targets: logo, scale: 0.3, translateY: -52 });
const animateLogoDown = logo => anime({ targets: logo, scale: 1, translateY: 0 });
const animateMenuUp = menu => anime({ targets: menu, translateY: -85 });
const animateMenuDown = menu => anime({ targets: menu, translateY: 0 });
const animateLinkUp = link => anime({ targets: link, translateY: 25, translateX: -100 });
const animateLinkDown = link => anime({ targets: link, translateY: 0, translateX: 0 });
const animateSecondLinkUp = link => anime({ targets: link, translateY: 25 });
const animateSecondLinkDown = link => anime({ targets: link, translateY: 0 });
const animateThirdLinkUp = link => anime({ targets: link, translateX: 100 });
const animateThirdLinkDown = link => anime({ targets: link, translateX: 0 });

const listenScrollEvent = (setMenuShowing, location) => {
	if (window.scrollY < 50 && location) {
		setMenuShowing(true);
	} else {
		setMenuShowing(false);
	}
};
const Header = ({ setValue, darkMode, ...props }) => {
	const [ user, setUser ] = useContext(UserCtx);
	const [ menuShowing, setMenuShowing ] = useState(
		props.history.location.pathname === '/quizzes',
	);

	useEffect(
		() => {
			let data = JSON.parse(localStorage.getItem('user'));
			if (data) {
				setUser(data.user);
			}

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

				<InputSwitch
					style={{ marginRight: '20px' }}
					onLabel='Dark Mode'
					offLabel='Light Mode'
					checked={darkMode}
					onChange={e => setValue(e.value)}
				/>
			</HeaderWrapper>

			<Transition in={menuShowing} appear onExit={animateMenuUp} onEnter={animateMenuDown}>
				<StyledMenu menuUp={menuShowing}>
					<div style={{ marginRight: '40px' }}>
						<Transition
							in={menuShowing}
							appear
							onExit={animateLinkUp}
							onEnter={animateLinkDown}
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
						onExit={animateLogoUp}
						onEnter={animateLogoDown}
					>
						<Logo src={quizbaker} />
					</Transition>
					{user ? (
						<div style={{ marginLeft: '40px' }}>
							<Transition
								in={menuShowing}
								appear
								onExit={animateSecondLinkUp}
								onEnter={animateSecondLinkDown}
							>
								<LinkWrapper>
									<StyledLink to='/user/settings'>{user.username}</StyledLink>
								</LinkWrapper>
							</Transition>
							<Transition
								in={menuShowing}
								appear
								onExit={animateThirdLinkUp}
								onEnter={animateThirdLinkDown}
							>
								<LinkWrapper>
									<StyledLink
										as='a'
										onClick={() => {
											props.history.push('/quizzes');
										}}
									>
										logout
									</StyledLink>
								</LinkWrapper>
							</Transition>
						</div>
					) : (
						<div>
							<Link to='/login'>Join Us</Link>
						</div>
					)}
				</StyledMenu>
			</Transition>
		</Wrapper>
	);
};

export default withRouter(Header);
