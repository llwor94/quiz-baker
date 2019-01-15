import React, { useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { TextArea } from '../../Styles/Input';
import Button from '../../Styles/Button';
import { ProfileIcon } from '../../Styles/Image';

const NewCommentArea = styled.div`
	display: flex;
	flex-direction: column;
	border-radius: 4px;
	border: 1px solid;
	border-color: ${props => props.theme.accent};
	padding: 20px 10px;
	position: relative;
	background-color: ${props => props.theme.secondary};
`;

export const CommentArea = styled.div`
	padding: 0 16px;
	border-radius: 4px;
	border: 1px solid;
	width: 500px;
	border-color: ${props => props.theme.accent};

	margin: 10px 0;
	background-color: ${props => props.theme.secondary};
`;

export const NewComment = ({ user, commentInput, setCommentInput, handleClick, handleClose }) => {
	let input = React.createRef();
	useEffect(() => {
		input.current.focus();
	}, []);

	const handleBlur = e => {
		let currentTarget = e.currentTarget;
		setTimeout(() => {
			if (!currentTarget.contains(document.activeElement)) {
				handleClose();
			}
		}, 0);
	};
	return (
		<NewCommentArea onBlur={handleBlur}>
			<TextArea
				inputRef={input}
				value={commentInput}
				onChange={e => setCommentInput(e.target.value)}
			/>
			<Button label='Comment' onClick={handleClick} disabled={!commentInput} />
		</NewCommentArea>
	);
};

const BigWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-top: 1px solid;
	border-color: ${props => props.theme.accent};

	width: 100%;
	overflow: visible;
	transition: background 1s ease 0s;
	margin-top: 11px;
	padding-top: 5px;
	margin-bottom: 5px;
`;

const CommentHeader = styled.div`
	display: flex;
	font-size: 12px;
	font-weight: 400;
	align-items: center;
	line-height: 16px;
	min-height: 18px;
	color: ${props => props.theme.link};

	span {
		font-size: 12px;
		font-weight: 400;
		line-height: 16px;

		flex: 0 0 auto;
	}
`;

const UserName = styled.a`
	font-size: 12px;
	font-weight: 400;
	line-height: 16px;
	color: ${props => props.theme.accentRed};
	padding-left: 3px;
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
				<ProfileIcon src={comment.author_img} />
				Posted by <UserName>{comment.author}</UserName>
				<span style={{ padding: '0 3px' }}>&#8226;</span>
				<span>{moment(comment.created_at).fromNow()}</span>
			</CommentHeader>
			<CommentBody>
				<p>{comment.text}</p>
			</CommentBody>
		</div>
		{user &&
		user.username === comment.author && <Button label='delete' onClick={handleClick} />}
	</BigWrapper>
);
