import React from 'react';
import styled from 'styled-components';
import blankProfile from '../../assets/blank-profile.png';

const StyledImage = styled.img`
	height: 20px;
	width: 20px;
	border-radius: 50%;
	margin-right: 3px;
`;
export const ProfileIcon = ({ src }) => <StyledImage src={src ? src : blankProfile} />;
