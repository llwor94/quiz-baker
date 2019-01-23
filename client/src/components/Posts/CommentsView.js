import React, { useState, useEffect, useContext } from 'react';
import Comment from '../Post/Comment';
import server from '../../utils/server';
import { CommentsWrapper, InnerWrapper } from '../../Styles/Posts';
const Comments = ({ currentPost }) => {
	const [ comments, setComments ] = useState(undefined);
	const [ showing, setShowing ] = useState(false);
	useEffect(
		() => {
			if (currentPost) {
				setShowing(true);
				server.get(`/posts/${currentPost}/comments`).then(({ data }) => {
					setComments(data.sort((a, b) => b.id - a.id));
				});
			} else {
				setShowing(false);
				setComments(undefined);
			}
		},
		[ currentPost ],
	);
	if (!showing) return <div style={{ flexGrow: 1, marginLeft: '10px'}} />;
	if (!comments)
		return (
			<CommentsWrapper>
				<InnerWrapper />
			</CommentsWrapper>
		);
	else
		return (
			<CommentsWrapper>
				<InnerWrapper comments={comments}>
					<div className='inner'>
						{comments.map(comment => <Comment key={comment.id} comment={comment} />)}
					</div>
				</InnerWrapper>
			</CommentsWrapper>
		);
};

export default Comments;
