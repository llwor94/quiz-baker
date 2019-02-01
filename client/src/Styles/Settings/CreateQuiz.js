import styled from 'styled-components';
export const ModalWrapper = styled.div`
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.4);
	position: fixed;
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;
	z-index: 2000;
	${props => props.theme.center};
	overflow: hidden;
`;
export const Wrapper = styled.div`
	${props => props.theme.fancyBorder};
	position: absolute;
	background-color: ${props => props.theme.secondary};
	margin-bottom: 10px;
	${props => props.theme.flex('column')};
	width: 60%;
	max-width: 760px;
	min-height: 400px;
	padding: 40px;
	.wrap {
		${props => props.theme.flex(undefined, 'space-between')};
	}
	svg {
		width: 300px;
		fill: ${props => props.theme.text};
	}

	button {
		width: 100%;
	}

	textarea {
		height: 150px;
		margin-bottom: 0;
	}
`;

export const InnerWrapper = styled.div`
	${props => props.theme.flex('column')};
	padding: 20px 10px 0 10px;
`;
