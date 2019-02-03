import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import anime from 'animejs';

import server from 'server';

import { AuthCtx } from 'auth';

import { EmojiInput } from 'styles/Components/Input';
import { ProfileIcon } from 'styles/Components/Image';
import { Button } from 'styles/Components/Button';
import {
	Wrapper,
	CommentHeader,
	UserName,
	CommentWrapper,
	PostComment,
	RightSide,
} from 'styles/Comments/Comment';

const Comments = ({ post }) => {
	const { user } = useContext(AuthCtx);
	const [ comments, setComments ] = useState(undefined);
	const [ comment, setComment ] = useState('');

	useEffect(() => {
		server
			.get(`/posts/${post.id}/comments`)
			.then(({ data }) => {
				setComments(data.sort((a, b) => b.id - a.id));
			})
			.catch(err => console.log(err));
	}, []);

	useEffect(
		() => {
			anime({
				targets: '.comment',
				translateY: 0,
				opacity: 1,
				delay: anime.stagger(20, { easing: 'easeOutQuad' }),
			});
		},
		[ comments ],
	);
	const handlePostComment = () => {
		server
			.post(`/posts/${post.id}/comments`, { text: comment })
			.then(response => {
				server.get(`/posts/${post.id}/comments`).then(({ data }) => {
					setComments(data.sort((a, b) => b.id - a.id));
					setComment('');
				});
			})
			.catch(err => console.log(err));
	};
	const deleteComment = id => {
		server
			.delete(`posts/${post.id}/comments/${id}`)
			.then(({ data }) => {
				server.get(`/posts/${post.id}/comments`).then(({ data }) => {
					setComments(data.sort((a, b) => b.id - a.id));
				});
			})
			.catch(error => console.log(error));
	};
	return (
		<CommentWrapper className='comments'>
			{user && (
				<PostComment>
					<ProfileIcon src={user.img_url} />
					<EmojiInput
						placeholder='Post a comment'
						value={comment}
						onChange={e => setComment(e.target.value)}
						handleSelect={e => setComment(comment + e.native)}
						onKeyUp={e => {
							if (e.keyCode === 13) {
								handlePostComment();
							}
						}}
						style={{ flexGrow: 1 }}
					/>
				</PostComment>
			)}
			{!comments ? (
				<div>Loading...</div>
			) : (
				comments.map(comment => (
					<Wrapper
						key={comment.id}
						className='comment'
						style={{ opacity: 0, transform: 'translateY(-60px)' }}
					>
						<CommentHeader>
							{' '}
							<ProfileIcon src={comment.author_img} />
							<UserName>{comment.author} </UserName>
							<p>{comment.text}</p>
						</CommentHeader>
						<RightSide>
							{user &&
							user.username === comment.author && (
								<Button
									icon='pi pi-trash'
									white
									onClick={() => deleteComment(comment.id)}
								/>
							)}
							<div>{moment(comment.created_at).fromNow()}</div>
						</RightSide>
					</Wrapper>
				))
			)}
		</CommentWrapper>
	);
};
export default Comments;
