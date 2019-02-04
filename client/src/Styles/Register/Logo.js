import styled from 'styled-components';

export const LogoWrapper = styled.div`
	position: relative;
	font-size: 256px;
	span {
		font-family: "Merienda One", cursive;
	}

	.Q {
		color: ${props => props.theme.pink};
	}

	.B {
		color: ${props => props.theme.aqua};
	}

	.dot {
		font-family: "Merienda One", cursive;
		color: ${props => props.theme.pink};
		position: absolute;
		bottom: -132px;
		left: 68px;
	}

	img {
		height: 200px;
		position: absolute;
		top: -60px;
		left: -93px;
		transform: rotate(-40deg);
		z-index: 1;
		background-color: ${props => props.theme.secondary};
	}
`;
