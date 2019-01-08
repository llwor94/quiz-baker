import React, { Fragment } from 'react';
import styled from 'styled-components';
import blankProfile from '../../../assets/blank-profile.png';

const UserWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	img {
		height: 20px;
		width: 20px;
		border-radius: 50%;
	}
`;

export const StyledLeaderBoard = ({ userScore }) => {
	return (
		<div>
			<UserWrapper>
				<img src={userScore.img_url ? userScore.img_url : blankProfile} />
				<div>{userScore.username}</div>
			</UserWrapper>
			<div>{userScore.score}</div>
		</div>
	);
};
