import React, { useState, useEffect, useContext, Fragment } from 'react';
import { UserCtx } from '../App';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';

import { InputSwitch } from 'primereact/inputswitch';

import pieIcon from '../assets/noun_Pie_706498.svg';
import quizbaker from '../assets/quizbaker.png';
import { logout } from '../store/actions/authActions';

const HeaderWrapper = styled.div`
	height: 40px;
	position: fixed;
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: space-between;
	background-color: ${props => props.theme.secondary};
	padding: 0 10px;
	top: 0;
	z-index: 100;
	box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.3);
`;

const LeftHeader = styled.div`margin-left: 20px;`;

const LinkWrapper = styled.div`
	margin: 0 40px;
	width: 70px;
	text-align: center;
`;

const StyledHeader = styled(Link)`
font-size: 20px;
  font-family: 'Merienda One', cursive;
  color: ${props => props.theme.pink};
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

const HeaderLinkWrapper = styled.div`
	transition: opacity 0.5s;
	opacity: ${props => (props.alwaysShow ? 1 : 0)};

	opacity: ${props => !props.alwaysShow && (props.menuUp ? 0 : 1)};
	position: absolute;
	top: 5px;
	left: 50%;
	width: 600px;
	display: flex;
	justify-content: space-between;
	-webkit-transform: translateX(-50%);
	transform: translateX(-50%) a {
		margin: 0 20px;
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
	position: fixed;
	border: .5px solid;
	background-color: ${props => props.theme.secondary};
	border-color: ${props => props.theme.accent};
	display: flex;
	align-items: center;
	justify-content: center;
	height: 85px;
	transition: all .5s ease-in-out;
	padding: 12px 25px;
	z-index: 90;
	width: 100%;
	top: -150px;
	top: ${props => (props.menuUp ? '40px' : '-150px')};
`;

const listenScrollEvent = setMenuShowing => {
	if (window.scrollY > 50) {
		setMenuShowing(false);
	} else {
		setMenuShowing(true);
	}
};
const Header = ({ setValue, darkMode, ...props }) => {
	const [ user, setUser ] = useContext(UserCtx);
	const [ menuShowing, setMenuShowing ] = useState(true);

	useEffect(
		() => {
			let data = JSON.parse(localStorage.getItem('user'));
			if (data) {
				setUser(data.user);
			}

			if (props.history.location.pathname === '/quizzes') {
				setMenuShowing(true);
				window.addEventListener('scroll', () => listenScrollEvent(setMenuShowing));
			} else {
				setMenuShowing(false);
				window.removeEventListener('scroll', () => listenScrollEvent(setMenuShowing));
			}
		},
		[ props.history.location.pathname ],
	);

	return (
		<div>
			<HeaderWrapper>
				<LeftHeader>
					<StyledHeader to='/'>
						Quiz <span> Baker</span>
					</StyledHeader>
				</LeftHeader>
				<HeaderLinkWrapper
					menuUp={menuShowing}
					alwaysShow={props.history.location.pathname !== '/quizzes'}
				>
					<div>
						<LinkWrapper as='span'>
							<StyledLink to='/quizzes'>Quizzes</StyledLink>
						</LinkWrapper>
						<LinkWrapper as='span'>
							<StyledLink to='/forum'>Forum</StyledLink>
						</LinkWrapper>
					</div>
					<img
						src={quizbaker}
						style={{
							width: '60px',
							height: '60px',
							position: 'absolute',
							top: 0,
							left: '0',
							right: '0',
							marginLeft: 'auto',
							marginRight: 'auto',
						}}
					/>
					{user ? (
						<div>
							<LinkWrapper as='span'>
								<StyledLink to='/user/settings'>{user.username}</StyledLink>
							</LinkWrapper>
							<LinkWrapper as='span'>
								<StyledLink
									as='a'
									onClick={() => {
										props.history.push('/quizzes');
									}}
								>
									logout
								</StyledLink>
							</LinkWrapper>
						</div>
					) : (
						<div>
							<Link to='/login'>Join Us</Link>
						</div>
					)}
				</HeaderLinkWrapper>
				<InputSwitch
					style={{ marginRight: '20px' }}
					onLabel='Dark Mode'
					offLabel='Light Mode'
					checked={darkMode}
					onChange={e => setValue(e.value)}
				/>
			</HeaderWrapper>

			{props.history.location.pathname === '/quizzes' && (
				<StyledMenu menuUp={menuShowing}>
					<div style={{ marginRight: '40px' }}>
						<LinkWrapper>
							<StyledLink to='/quizzes'>Quizzes</StyledLink>
						</LinkWrapper>
						<LinkWrapper>
							<StyledLink to='/forum'>Forum</StyledLink>
						</LinkWrapper>
					</div>
					<img
						src={quizbaker}
						style={{ width: '150px', height: '150px', position: 'absolute', top: 0 }}
					/>
					{user ? (
						<div style={{ marginLeft: '40px' }}>
							<LinkWrapper>
								<StyledLink to='/user/settings'>{user.username}</StyledLink>
							</LinkWrapper>
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
						</div>
					) : (
						<div>
							<Link to='/login'>Join Us</Link>
						</div>
					)}
				</StyledMenu>
			)}
		</div>
	);
};

export default withRouter(Header);
