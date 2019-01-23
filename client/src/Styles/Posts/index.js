import styled from 'styled-components';

export const Wrapper = styled.div`
	width: 100%;
	display: flex;
	margin: 70px 0;

	justify-content: stretch;

	.new-post {
		position: fixed;

		top: 54px;

		width: 1000px;

		display: flex;

		align-items: center;

		left: -72px;

		height: 65px;
		z-index: 90;
		background-color: #ffffff;
		/* background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23acadae' fill-opacity='0.14'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); */

		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cg fill='%23878787' fill-opacity='0.07'%3E%3Cpolygon fill-rule='evenodd' points='8 4 12 6 8 8 6 12 4 8 0 6 4 4 6 0 8 4'/%3E%3C/g%3E%3C/svg%3E");
	}
`;
export const CommentsWrapper = styled.div`
	flex-grow: 1;
	position: relative;
	margin-left: 10px;
`;
export const InnerWrapper = styled.div`
	position: fixed;
	overflow: scroll;

	padding: 39px 60px;
	border-top: 1px solid ${props => props.theme.pink};
	border-radius: 4px;
	border-right: 1px solid ${props => props.theme.pink};

	top: 119px;
	width: 32%;
	background-color: ${props => props.comments && props.theme.secondary};
	margin: 0;

	padding: 30px 60px;
	height: 100%;
	.inner {
		width: 400px;
	}
`;
