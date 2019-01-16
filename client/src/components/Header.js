import React, { Fragment, useEffect, useContext } from 'react';
import { UserCtx } from '../App';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';

import { InputSwitch } from 'primereact/inputswitch';

import pieIcon from '../assets/noun_Pie_706498.svg';

import { logout } from '../store/actions/authActions';

const HeaderWrapper = styled.div`
	height: 70px;
	position: fixed;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: ${props => props.theme.secondary};
	padding: 0 10px;
	top: 0;
	z-index: 100;
	left: 0;
	width: 100%;
	box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.3);
`;

const LeftHeader = styled.div`margin-left: 20px;`;

const StyledLink = styled(Link)`
  margin-left: 20px;
  font-size: 30px;
  font-family: 'Merienda One', cursive;
  padding-right: 5px;
  color: ${props => props.theme.header};
  &:hover{
	  color:${props => props.theme.aqua}
  }
`;

const StyledMenu = styled.div`
	position: fixed;
	background-color: ${props => props.theme.secondary};
	border-color: ${props => props.theme.accent};
	display: flex;
	justify-content: space-between;
	top: 70px;
	padding: 12px 25px;
	z-index: 100;
	width: 100%;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
		0 2px 1px -1px rgba(0, 0, 0, 0.12);

	a {
		background-color: ${props => props.theme.secondary};
		color: ${props => props.theme.text};
		font-size: 14px;
		margin: 9px;
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
		<Fragment>
			<HeaderWrapper>
				<LeftHeader>
					<img src={pieIcon} style={{ width: '40px' }} />
					<StyledLink to='/'>Quiz Baker</StyledLink>
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
				<div>
					<Link to='/quizzes'>Quizzes</Link>
					<Link to='/forum'>Forum</Link>
				</div>
				{user && (
					<div>
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
				)}
			</StyledMenu>
		</Fragment>
	);
};

export default withRouter(Header);
