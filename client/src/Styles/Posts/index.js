import styled from 'styled-components';

export const Wrapper = styled.div`
	width: 100%;
	display: flex;
	margin: 70px 0;
	justify-content: stretch;
	@media (max-width: 1200px) {
		justify-content: center;
	}

	.post-wrapper {
		max-width: 500px;
		flex-grow: 1;
		flex-direction: column;
		margin-top: 40px;
		align-items: center;
		@media (max-width: 1200px) {
			margin-left: 25px;
		}
		@media (max-width: 1000px) {
			margin-left: 0;
		}
		@media (max-width: 500px) {
			width: 100%;
		}
	}
`;
export const CommentsWrapper = styled.div`
	flex-grow: 1;
	position: relative;
	margin-left: 10px;
	height: calc(100vh - 100px);
	.image {
		position: fixed;
		top: 59px;
		width: 32%;
		padding: 60px;
		padding-top: 150px;
		min-width: 500px;
		.quizBaker {
			filter: grayscale(24%);
			height: 400px;

			/* position: fixed;
		right: 300px;
		top: 325px; */
			opacity: .8;
		}
	}
`;
export const InnerWrapper = styled.div`
	position: fixed;
	overflow: scroll;
	height: calc(100vh - 50px);
	border-right: 1px solid ${props => props.theme.pink};
	border-left: 1px solid ${props => props.theme.pink};
	top: 59px;
	min-width: 500px;
	width: 32%;
	background-color: ${props => props.comments && props.theme.secondary};
	margin: 0;

	padding: 30px 60px;

	.inner {
		width: 400px;
		padding-bottom: 50px;
	}
`;
