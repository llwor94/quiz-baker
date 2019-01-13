import React, { Fragment } from 'react';
import styled from 'styled-components';
import blankProfile from '../../../assets/blank-profile.png';

const UserWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 200px;
	margin: 10px 0;
	img {
		height: 30px;
		width: 30px;
		border-radius: 50%;
		margin-right: 4px;
	}
`;

const User = styled.div`
	display: flex;
	align-items: center;
`;

export const StyledLeaderBoard = ({ userScore }) => {
	return (
		<div>
			<UserWrapper>
				<User>
				<img src={userScore.img_url ? userScore.img_url : blankProfile} />
				<span>{userScore.username}</span>
				</User>
				<div>{userScore.score}</div>
			</UserWrapper>
		</div>
	);
};
