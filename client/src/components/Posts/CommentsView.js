import React, { useState, useEffect, useContext } from 'react';
import Comment from '../Post/Comment';
import server from '../../utils/server';
import { CommentsWrapper, InnerWrapper } from '../../Styles/Posts';
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
			<CommentsWrapper>
				<InnerWrapper>
					{comments.map(comment => <Comment key={comment.id} comment={comment} />)}
				</InnerWrapper>
			</CommentsWrapper>
		);
};

export default Comments;
