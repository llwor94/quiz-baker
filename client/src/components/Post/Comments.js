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
import Comment from './Comment';
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
			{post.comments
				.sort((a, b) => b.id - a.id)
				.map(comment => (
					<Comment comment={comment} key={comment.id} deleteComment={deleteComment} />
				))}
		</CommentArea>
	);
};

export default Comments;
