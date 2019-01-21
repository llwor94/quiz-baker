import React, { useState, useContext, useEffect, Fragment } from 'react';
import server from '../../utils/server';
import { PostCtx } from '../../pages/Post';
import { ProfileIcon } from '../../Styles/Components/Image';
import { UserCtx } from '../../App';
import { CommentWrapper, PostComment } from '../../Styles/Comments/Comment';
import { EmojiInput } from '../../Styles/Components/Input';
const NewComment = () => {
	const [ post, setPost ] = useContext(PostCtx);
	const [ commentInput, setCommentInput ] = useState('');
	const [ user, setUser ] = useContext(UserCtx);

	const addComment = () => {
		server
			.post(`posts/${post.id}/comments`, { text: commentInput })
			.then(({ data }) => {
				console.log(data);
				setCommentInput('');

				server.get(`/posts/${post.id}`).then(({ data }) => {
					setPost(data);
				});
			})
			.catch(error => console.log(error));
	};

	return (
		<PostComment>
			<ProfileIcon src={user.img_url} />
			<EmojiInput
				placeholder='Post a comment'
				value={commentInput}
				onChange={e => setCommentInput(e.target.value)}
				handleSelect={e => setCommentInput(commentInput + e.native)}
				onKeyUp={e => {
					if (e.keyCode === 13) {
						addComment();
					}
				}}
				style={{ flexGrow: 1 }}
			/>
		</PostComment>
	);
};

export default NewComment;
