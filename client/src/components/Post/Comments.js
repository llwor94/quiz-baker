import React, { useContext } from 'react';

import server from '../../utils/server';

import { PostCtx } from '../../pages/Post';

import Comment from './Comment';

import { CommentArea } from '../../Styles/Comments/Comment';

const Comments = () => {
	const [ post, setPost ] = useContext(PostCtx);

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
