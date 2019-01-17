import React from 'react';
import styled from 'styled-components';
import blankProfile from '../../assets/blank-profile.png';
import brownie from '../../assets/brownie.svg';
import cake from '../../assets/cake.svg';

const IconWrapper = styled.div`
	background-color: gray;
	margin-right: 3px;
	height: 40px;
	width: 40px;
`;
const StyledIcon = styled.img`
	height: 40px;
	width: 40px;
	border-radius: 50%;
`;
export const ProfileIcon = ({ src }) => (
	<IconWrapper>
		<StyledIcon src={src ? src : cake} />
	</IconWrapper>
);

const StyledImage = styled.img`
	height: 300px;
	width: 300px;
	border-radius: 10px;
`;

export const LargeImage = ({ src }) => <StyledImage src={src ? src : blankProfile} />;
