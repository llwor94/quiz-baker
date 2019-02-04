import React, { useContext, useEffect } from 'react';
import anime from 'animejs';
import server from 'server';

import { PostCtx } from 'pages/Post';

import Comment from './Comment';

import { CommentArea } from 'styles/Comments/Comment';

const Comments = () => {
	const [ post, setPost ] = useContext(PostCtx);
	useEffect(() => {
		if (post.comments) {
			anime({
				targets: '.comment',
				translateY: 0,
				opacity: 1,
				delay: anime.stagger(20, { easing: 'easeOutQuad' }),
			});
		}
	}, []);
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
	useEffect(
		() => {
			if (post.comments) {
				anime({
					targets: '.comment',
					translateY: 0,
					opacity: 1,
					delay: anime.stagger(20, { easing: 'easeOutQuad' }),
				});
			}
		},
		[ post.comments ],
	);
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
