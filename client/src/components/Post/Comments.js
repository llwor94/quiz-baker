import React, { useState, useContext, Fragment } from 'react';
import moment from 'moment';

import server from '../../utils/server';
import { PostCtx } from '../../pages/Post';
import { UserCtx } from '../../App';
import {
	CommentArea,
	Wrapper,
	CommentHeader,
	UserName,
	CommentBody,
} from '../../Styles/Comments/Comment';
import { ProfileIcon } from '../../Styles/Components/Image';
import { Button } from '../../Styles/Components/Button';

const Comments = () => {
	const [ post, setPost ] = useContext(PostCtx);
	const [ user, setUser ] = useContext(UserCtx);

	const deleteComment = id => {
		server
			.delete(`posts/${post.id}/comments/${id}`)
			.then(({ data }) => {
				server.get(`/posts/${post.id}`).then(({ data }) => {
					setPost(data);
				});
			})
			.catch(error => console.log(error));
	};

	return (
		<CommentArea>
			{post.comments.sort((a, b) => b.id - a.id).map(comment => (
				<Wrapper key={comment.id}>
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
					user.username === comment.author && (
						<Button label='delete' onClick={() => deleteComment(comment.id)} />
					)}
				</Wrapper>
			))}
		</CommentArea>
	);
};

export default Comments;
