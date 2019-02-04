import styled from 'styled-components';

export const Wrapper = styled.div`
	width: 100%;
	${props => props.theme.flex(undefined, 'stretch')};
	margin: 70px 0;
	@media (max-width: 1200px) {
		justify-content: center;
	}
	.posts {
		flex-grow: 1;
		max-width: 500px;
		${props => props.theme.flex(undefined, 'flex-end')};
		@media (min-width: 1500px) {
			max-width: 600px;
		}
	}
	.post-wrapper {
		max-width: 500px;
		${props => props.theme.flex('column', undefined, 'center')};
		margin-top: 40px;
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
	.new-post {
		width: 100%;
	}
`;
export const CommentsWrapper = styled.div`
	flex-grow: 1;
	position: relative;

	margin-left: 10px;
	height: calc(100vh - 100px);
	max-width: 500px;
	.image {
		position: fixed;
		top: 56px;
		width: 32%;
		padding: 60px;
		padding-top: 150px;
		min-width: 500px;
		.quizBaker {
			filter: grayscale(24%);
			height: 400px;
			opacity: .8;
		}
	}
`;
export const InnerWrapper = styled.div`
	position: fixed;

	height: calc(100vh - 50px);
	border-right: 1px solid ${props => props.theme.pink};
	border-left: 1px solid ${props => props.theme.pink};
	top: 56px;
	min-width: 500px;
	width: 32%;
	background-color: ${props => props.comments && props.theme.secondary};
	margin: 0;
	${props => props.theme.flex(undefined, 'center')};
	padding: 30px 60px;

	.inner {
		width: 400px;
		padding-bottom: 50px;

		/* .comment {
			transform: translateY(-60px);
			opacity: 0;
		} */
	}

	.comments-wrapper {
		overflow-y: scroll;
		height: 100%;
	}
`;

export const PostWrapper = styled.div`
	width: 500px;
	position: relative;
	margin-top: 70px;

	@media (max-width: 500px) {
		width: 100%;
		padding: 10px;
	}
`;
