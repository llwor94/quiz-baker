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
`;
export const InnerWrapper = styled.div`
	position: fixed;
	overflow: scroll;
	border-right: 1px solid o${props=> props.theme.pink};
	top: 59px;
	width: 32%;
	background-color: ${props => props.comments && props.theme.secondary};
	margin: 0;

	padding: 30px 60px;
	height: 100%;
	.inner {
		width: 400px;
	}
`;
