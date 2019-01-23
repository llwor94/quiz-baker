import React from 'react';
import styled from 'styled-components';
import blankProfile from '../../assets/blank-profile.png';

import { userImage } from '../../utils/imgArray';

const IconWrapper = styled.div`
	background-color: #e4e6e7;
	margin-right: 3px;
	height: 40px;
	width: 40px;
	border-radius: 10px;
	margin-right: 7px;
`;
const StyledIcon = styled.img`
	max-width: 100%;
	max-height: 100%;
	margin: ${props => !props.image && '5px'};
	border-radius: 10px;
	opacity: ${props => !props.image && '.5'};
`;
export const ProfileIcon = ({ src }) => {
	return (
		<IconWrapper>
			<StyledIcon src={src ? src : Object.values(userImage())[0]} image={src} />
		</IconWrapper>
	);
};

const StyledImage = styled.img`
	width: 130px;
	height: 130px;
	border-radius: 10px;
	z-index: 1000;
`;

export const LargeImage = ({ src }) => <StyledImage src={src ? src : blankProfile} />;

const BiggerImage = styled.img`
	width: 350px;
	height: 350px;
	border-radius: 10px;
	z-index: 1000;
`;
export const HugeImage = ({ src }) => <BiggerImage src={src ? src : blankProfile} />;
