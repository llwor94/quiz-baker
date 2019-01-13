import React from 'react';
import styled from 'styled-components';
import blankProfile from '../../assets/blank-profile.png';

const StyledImage = styled.img`
	height: 40px;
	width: 40px;
	border-radius: 50%;
	margin-right: 3px;
`;
export const ProfileIcon = ({ src }) => <StyledImage src={src ? src : blankProfile} />;
