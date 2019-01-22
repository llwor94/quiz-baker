import styled from 'styled-components';

export const Wrapper = styled.div`
	width: 100%;
	display: flex;
	margin: 70px 0;

	justify-content: stretch;
`;
export const CommentsWrapper = styled.div`
	flex-grow: 1;
	position: relative;
	margin-left: 10px;
	box-shadow: -1px 1px 0px 0 rgba(0, 0, 0, 0.2), 0 1px 0px 0 rgba(0, 0, 0, 0.14),
		0 2px 2px -1px rgba(0, 0, 0, 0.12);
	border-left: 1px solid ${props => props.theme.pink};
`;
export const InnerWrapper = styled.div`
	position: fixed;

	top: 59px;
	width: 100%;
	background-color: ${props => props.theme.secondary};
	margin: 0;
	z-index: 100;
	padding: 30px 60px;
	height: 100%;
	.inner {
		width: 400px;
	}
`;
