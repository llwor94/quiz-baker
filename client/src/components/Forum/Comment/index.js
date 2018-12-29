import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

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
