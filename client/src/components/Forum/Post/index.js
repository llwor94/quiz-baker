import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Editor } from 'primereact/editor';

export const PostWrapper = styled.div`
	padding-left: 8px;
	border-radius: 4px;
	border: 1px solid;
	border-color: ${props => props.theme.accent};
	position: relative;
	margin-bottom: 10px;
	background-color: ${props => props.theme.secondary};
	font-family: 'IBM Plex Sans', sans-serif;

	&:hover {
		border-color: rgb(129, 131, 132);
	}
`;
const InnerWrapper = styled.div`
	padding-top: 8px;
	margin: 0 8px;
`;

const PostTitle = styled.div`
	font-size: 18px;
	font-weight: 500;
	line-height: 22px;
	cursor: pointer;
	color: ${props => props.theme.text};
`;

const BodyWrapper = styled.div`
	max-height: 250px;
	overflow: hidden;
	p {
		font-size: 14px;
		font-weight: 400;
		line-height: 21px;
		mask-image: linear-gradient(180deg, #000 60%, transparent);
		color: ${props => props.theme.text};
	}
`;
const Header = styled.div`
	font-size: 12px;
	font-weight: 400;
	line-height: 16px;
	display: flex;
	margin-bottom: 8px;
	color: ${props => props.theme.link};
`;

const FooterWrapper = styled.div`
	display: flex;
	align-items: center;
	font-size: 12px;
	font-weight: 700;
	button {
		width: auto;
		height: 25px;
		white-space: nowrap;
		padding-right: 4px;
		margin-right: 4px;
		text-transform: capitalize;
		overflow-wrap: initial;
		word-break: initial;
		border-radius: 2px;
		transition: background-color 0.1s ease 0s;
		background: transparent;
		border: none;
		color: ${props => props.theme.accentText};
		cursor: pointer;
		padding: initial;
	}
`;

export const Post = ({
	post: { title, author, body, created_at, comment_count },
	handleClick,
	children,
}) => {
	return (
		<PostWrapper>
			<InnerWrapper>
				<Header>
					Posted by {author.username ? author.username : author}
					{moment(created_at).fromNow()}
				</Header>
				<PostTitle onClick={handleClick}>{title}</PostTitle>
				<BodyWrapper>
					<p>{body}</p>
				</BodyWrapper>
				<FooterWrapper>
					<button>{comment_count} comments</button>
					<button>Share</button>
					<button>Save</button>
				</FooterWrapper>
			</InnerWrapper>
			{children}
		</PostWrapper>
	);
};

const NewCommentArea = styled.div`
	margin: 24px 40px;
	span {
		font-size: 12px;
		font-weight: 400;
		line-height: 18px;
		margin-right: 4px;
	}
	a {
		font-size: 12px;
		font-weight: 400;
		line-height: 16px;
		color: rgb(79, 188, 255);
	}
`;

export const CommentArea = styled.div`
	padding-right: 16px;
	padding-bottom: 16ox;
	margin: 16px 16px 0px 10px;
`;

export const NewComment = ({ user }) => (
	<NewCommentArea>
		<div>
			<span>Comment as</span>
			<a>{user.username}</a>
		</div>
	</NewCommentArea>
);

const CommentWrapper = styled.div`
	position: relative;
	width: 100%;
	overflow: visible;
	transition: background 1s ease 0s;
	margin-top: 16px;
`;

const CommentHeader = styled.div`
	display: flex;
	align-items: center;
	line-height: 16px;
	min-height: 18px;
	a {
		font-size: 12px;
		font-weight: 400;
		line-height: 16px;
		color: rgb(79, 188, 255);
	}
	span {
		font-size: 12px;
		font-weight: 400;
		line-height: 16px;
		padding-left: 8px;
		flex: 0 0 auto;
	}
`;

const CommentBody = styled.div`
	padding: 2px 0;
	width: 100%;
	font-size: 14px;
	font-weight: 400;
	line-height: 21px;
	overflow: auto;
`;

export const Comment = ({ comment }) => (
	<CommentWrapper>
		<CommentHeader>
			<a>{comment.author}</a>
			<span>{moment(comment.created_at).fromNow()}</span>
		</CommentHeader>
		<CommentBody>
			<p>{comment.text}</p>
		</CommentBody>
	</CommentWrapper>
);

const Wrapper = styled.div`
	width: 100%;
	padding: 20px 24px;
	display: flex;
	justify-content: center;
	background-color: ${props => props.theme.main};
`;

export const ForumWrapper = ({ children }) => (
	<Wrapper>
		<div style={{ width: '648px' }}>{children}</div>
	</Wrapper>
);
