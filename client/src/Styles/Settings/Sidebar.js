import styled from 'styled-components';

export const ProfileWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	h4 {
		font-size: 18px;
		line-height: 25px;
	}
`;

export const ProfileButtonWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	width: 200px;
	.update-user {
		display: flex;
		justify-content: space-between;
		width: 100%;
		margin-top: 10px;
	}
	.p-float-label {
		width: 100%;
		input {
			width: 100%;
		}
	}
	/* transform: translateX(20px); */
`;

export const ButtonCollapse = styled.div`
	height: 90px;
	width: 100px;
	background-color: ${props => props.theme.aqua};
	cursor: pointer;
	position: absolute;
	left: -16px;
	border-radius: 7px;
	writing-mode: vertical-lr;
	text-orientation: upright;
	color: white;
	font-weight: 700;
	div {
		font-size: 6px;
	}
`;
