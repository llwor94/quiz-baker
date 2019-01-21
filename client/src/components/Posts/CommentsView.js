import React, { useState, useEffect, useContext } from 'react';
import Comment from '../Post/Comment';
import server from '../../utils/server';
import { CommentsWrapper } from '../../Styles/Posts';
const Comments = ({ currentPost }) => {
	const [ comments, setComments ] = useState(undefined);
	useEffect(
		() => {
			if (currentPost) {
				server.get(`/posts/${currentPost}/comments`).then(({ data }) => {
					setComments(data.sort((a, b) => b.id - a.id));
				});
			}
		},
		[ currentPost ],
	);
	if (!comments) return <div style={{ width: '400px' }} />;
	else
		return (
			<div style={{ width: '400px' }}>
				<CommentsWrapper>
					{comments.map(comment => <Comment key={comment.id} comment={comment} />)}
				</CommentsWrapper>
			</div>
		);
};

export default Comments;
