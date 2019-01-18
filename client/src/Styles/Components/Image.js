import React from 'react';
import styled from 'styled-components';
import blankProfile from '../../assets/blank-profile.png';
import brownie from '../../assets/brownie.svg';
import cake from '../../assets/cake.svg';

const IconWrapper = styled.div`
	background-color: #e4e6e7;
	margin-right: 3px;
	height: 40px;
	width: 40px;
	border-radius: 10px;
`;
const StyledIcon = styled.img`
	height: 40px;
	width: 40px;

	border-radius: 10px;
	margin-right: 7px;
`;
export const ProfileIcon = ({ src }) => (
	<IconWrapper>
		<StyledIcon src={src ? src : cake} />
	</IconWrapper>
);

const StyledImage = styled.img`
	height: 150px;
	width: 150px;
	border-radius: 10px;
`;

export const LargeImage = ({ src }) => <StyledImage src={src ? src : blankProfile} />;
