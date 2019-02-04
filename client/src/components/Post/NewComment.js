import React, { useState, useContext } from 'react';

import server from 'server';

import { PostCtx } from 'pages/Post';
import { AuthCtx } from 'auth';

import { ProfileIcon } from 'styles/Components/Image';
import { PostComment } from 'styles/Comments/Comment';
import { EmojiInput } from 'styles/Components/Input';

const NewComment = () => {
	const [ post, setPost ] = useContext(PostCtx);
	const [ commentInput, setCommentInput ] = useState('');
	const { user } = useContext(AuthCtx);

	const addComment = () => {
		server
			.post(`posts/${post.id}/comments`, { text: commentInput })
			.then(({ data }) => {
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
				user={user}
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
