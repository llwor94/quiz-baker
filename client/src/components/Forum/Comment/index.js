import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';

const NewCommentArea = styled.div`
	display: flex;
	flex-direction: column;
`;

export const CommentArea = styled.div`
	padding: 0 16px;
	border-radius: 4px;
	border: 1px solid;
	border-color: ${props => props.theme.accent};
	position: relative;
	margin-bottom: 10px;
	background-color: ${props => props.theme.secondary};
`;

export const NewComment = ({ user, commentInput, setCommentInput, handleClick }) => (
	<NewCommentArea>
		<InputTextarea
			autoResize={true}
			value={commentInput}
			onChange={e => setCommentInput(e.target.value)}
		/>
		<Button label='Comment' className='p-button-secondary' onClick={handleClick} />
	</NewCommentArea>
);

const BigWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-top: 1px solid;
	border-color: ${props => props.theme.accent};
	position: relative;
	width: 100%;
	overflow: visible;
	transition: background 1s ease 0s;
	margin-top: 11px;
	padding-top: 5px;
	margin-bottom: 5px;
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

export const Comment = ({ comment, user, handleClick }) => (
	<BigWrapper>
		<div>
			<CommentHeader>
				<a>{comment.author}</a>
				<span>{moment(comment.created_at).fromNow()}</span>
			</CommentHeader>
			<CommentBody>
				<p>{comment.text}</p>
			</CommentBody>
		</div>
		{user.username === comment.author && <Button label='delete' onClick={handleClick} />}
	</BigWrapper>
);
