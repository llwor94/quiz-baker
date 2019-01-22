import styled from 'styled-components';

export const ProfileWrapper = styled.div`
	display: flex;
	margin-right: 20px;
	text-align: center;
	position: absolute;
	top: 12px;
	left: -180px;

	h4 {
		margin: 5px auto;
	}
`;

export const ProfileButtonWrapper = styled.div`
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	width: 200px;
	margin-right: 10px;
	/* transform: translateX(20px); */
`;

export const ButtonCollapse = styled.div`
	height: 90px;
	width: 100px;
	background-color: ${props=> props.theme.aqua};
	cursor: pointer;
	position: absolute;
	left: -16px;
	border-radius: 7px;
	writing-mode: vertical-lr;
	text-orientation: upright;
	color: white;
	font-weight: 700;
	div{
		font-size: 6px;
	}

`;