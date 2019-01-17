import React from 'react';
import styled from 'styled-components';
import blankProfile from '../../assets/blank-profile.png';

const StyledIcon = styled.img`
	height: 40px;
	width: 40px;
	border-radius: 50%;
	margin-right: 3px;
`;
export const ProfileIcon = ({ src }) => <StyledIcon src={src ? src : blankProfile} />;

const StyledImage = styled.img`
	height: 300px;
	width: 300px;
	border-radius: 50%;
`;

export const LargeImage = ({ src }) => <StyledImage src={src ? src : blankProfile} />;
