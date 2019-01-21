import React, { useState, useEffect, useContext } from 'react';
import { ProfileIcon } from '../../Styles/Components/Image';
import { UserCtx } from '../../App';
import server from '../../utils/server';
import { EmojiInput } from '../../Styles/Components/Input';
import { CommentWrapper, PostComment } from '../../Styles/Comments/Comment';
import moment from 'moment';
import { Button } from '../../Styles/Components/Button';
import { Wrapper, CommentHeader, UserName, CommentBody } from '../../Styles/Comments/Comment';
const Comments = ({ post }) => {
	const [ user, setUser ] = useContext(UserCtx);
	const [ comments, setComments ] = useState(undefined);
	const [ comment, setComment ] = useState('');

	useEffect(() => {
		server
			.get(`/posts/${post.id}/comments`)
			.then(({ data }) => {
				setComments(data);
			})
			.catch(err => console.log(err));
	}, []);

	const handlePostComment = () => {
		console.log(comment);
		server
			.post(`/posts/${post.id}/comments`, { text: comment })
			.then(response => {
				server.get(`/posts/${post.id}/comments`).then(({ data }) => {
					setComments(data);
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
					setComments(data);
				});
			})
			.catch(error => console.log(error));
	};
	return (
		<CommentWrapper>
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
			{!comments ? (
				<div>Loading...</div>
			) : (
				comments.map(comment => (
					<Wrapper key={comment.id}>
						<CommentHeader>
							{' '}
							<ProfileIcon src={comment.author_img} />
							<UserName>{comment.author}</UserName>
							<p>{comment.text}</p>
						</CommentHeader>
						<div>{moment(comment.created_at).fromNow()}</div>
						{user &&
						user.username === comment.author && (
							<Button
								icon='pi pi-trash'
								white
								onClick={() => deleteComment(comment.id)}
							/>
						)}
					</Wrapper>
				))
			)}
		</CommentWrapper>
	);
};
export default Comments;
