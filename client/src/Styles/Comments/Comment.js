import styled from 'styled-components';

export const CommentArea = styled.div`
	padding: 0 16px;
	border-radius: 4px;
	border: 1px solid;
	width: 500px;
	border-color: ${props => props.theme.accent};
	margin: 10px 0;
	background-color: ${props => props.theme.secondary};
`;

export const Wrapper = styled.div`
	${props => props.theme.flex('column', 'space-between', 'flex-start')};
	border-top: 1px solid;
	border-color: ${props => props.theme.accent};
	width: 100%;
	overflow: visible;
	transition: background 1s ease 0s;
	margin-top: 11px;
	padding-top: 10px;
	margin-bottom: 5px;

	span {
		color: ${props => props.theme.link};
		font-size: 12px;
	}

	&:first-child {
		border-top: none;
		margin-top: 0;
	}
`;

export const CommentHeader = styled.div`
	display: flex;
	width: 100%;
	font-weight: 400;
	line-height: 16px;
	min-height: 18px;

	img {
		min-width: 40px;
		height: 40px;
	}

	.p-button {
		${props => props.theme.backgroundBorder(props.theme.secondary)};

		&:hover {
			background-color: ${props => props.theme.secondary};
			border-color: ${props => props.theme.pink};
		}
		&:enabled:hover {
			background-color: ${props => props.theme.secondary};
			border-color: ${props => props.theme.pink};
		}
	}

	.pi-trash {
		color: ${props => props.theme.accent};
		font-size: 14px;
	}
`;

export const UserName = styled.a`
	font-weight: 400;
	line-height: 16px;
	color: ${props => props.theme.accentRed};
	padding-left: 3px;
`;

export const CommentBody = styled.div`
	padding: 2px 0;
	width: 100%;
	font-size: 14px;
	font-weight: 400;
	line-height: 21px;
	overflow: auto;
	${props => props.theme.flex('column', 'space-between')};
`;

export const CommentWrapper = styled.div`
	margin-bottom: 40px;
	width: 100%;
	padding: 0 10px 10px 10px;
	border: 1px solid ${props => props.theme.accent};
	border-radius: 4px;
	background: ${props => props.theme.secondary};
`;

export const PostComment = styled.div`
	display: flex;
	align-items: center;
	margin-top: 5px;
`;

export const RightSide = styled.div`
	${props => props.theme.flex('column', 'flex-end', 'flex-end')};
	align-self: flex-end;
	div {
		font-size: 10px;
		color: ${props => props.theme.accent};
		margin-top: 5px;
	}
`;
