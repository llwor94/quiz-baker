import React, { Fragment, useEffect, useContext } from 'react';
import { UserCtx } from '../App';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';

import { InputSwitch } from 'primereact/inputswitch';

import pieIcon from '../assets/noun_Pie_706498.svg';
import quizbaker from '../assets/quizbaker.png';
import { logout } from '../store/actions/authActions';

const Wrapper = styled.div`
	position: fixed;
	width: 100%;
	top: 0;
	z-index: 100;
	left: 0;
`;

const HeaderWrapper = styled.div`
	height: 70px;

	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: ${props => props.theme.secondary};
	padding: 0 10px;

	box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.3);
`;

const LeftHeader = styled.div`margin-left: 20px;`;

const StyledLink = styled(Link)`
  margin-left: 20px;
  font-size: 30px;
  font-family: 'Merienda One', cursive;
  padding-right: 5px;
  color: ${props => props.theme.pink};
	span {
		color: ${props => props.theme.aqua};
		font-family: 'Merienda One', cursive;
		
	}
  &:hover{
	  color:${props => props.theme.aqua};
		span {
			color: ${props => props.theme.pink}
		}
  }
`;

const StyledMenu = styled.div`
	position: relative;
	background-color: ${props => props.theme.secondary};
	border-color: ${props => props.theme.accent};
	display: flex;
	align-items: center;
	justify-content: center;

	padding: 12px 25px;
	z-index: 100;
	width: 100%;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
		0 2px 1px -1px rgba(0, 0, 0, 0.12);

	a {
		background-color: ${props => props.theme.secondary};
		color: ${props => props.theme.text};
		font-size: 14px;
		margin: 12px 20px;
	}
`;
const Header = ({ setValue, darkMode, ...props }) => {
	const [ user, setUser ] = useContext(UserCtx);

	useEffect(() => {
		let data = JSON.parse(localStorage.getItem('user'));
		if (data) {
			setUser(data.user);
		}
	}, []);
	return (
		<Wrapper>
			<HeaderWrapper>
				<LeftHeader>
					<StyledLink to='/'>
						Quiz <span> Baker</span>
					</StyledLink>
				</LeftHeader>
				<InputSwitch
					style={{ marginRight: '20px' }}
					onLabel='Dark Mode'
					offLabel='Light Mode'
					checked={darkMode}
					onChange={e => setValue(e.value)}
				/>
			</HeaderWrapper>
			<StyledMenu>
				<div style={{ marginRight: '40px' }}>
					<Link to='/quizzes'>Quizzes</Link>
					<Link to='/forum'>Forum</Link>
				</div>
				<img
					src={quizbaker}
					style={{ width: '70px', height: '70px', position: 'absolute', top: 0 }}
				/>
				{user ? (
					<div style={{ marginLeft: '40px' }}>
						<Link to='/user/settings'>{user.username}</Link>
						<a
							onClick={() => {
								props.logout();
								props.history.push('/quizzes');
							}}
						>
							logout
						</a>
					</div>
				) : (
					<div>
						<Link to='/login'>Join Us</Link>
					</div>
				)}
			</StyledMenu>
		</Wrapper>
	);
};

export default withRouter(Header);
