import React, { useState, useEffect, useContext } from 'react';

import { PostsCtx } from '../../pages/Forum';
import { NewPostWrapper, InnerWrapper } from '../../Styles/Posts/NewPost';
import { Button } from '../../Styles/Components/Button';
import { Input, TextArea } from '../../Styles/Components/Input';
import server from '../../utils/server';

const NewPost = () => {
	const [ posts, setPosts ] = useContext(PostsCtx);
	const [ newPost, setNewPost ] = useState(false);
	const [ post, setPost ] = useState({ title: '', body: '' });

	let input = React.createRef();
	useEffect(
		() => {
			if (newPost) {
				input.current.focus();
			}
		},
		[ newPost ],
	);
	const handleBlur = e => {
		let currentTarget = e.currentTarget;
		setTimeout(() => {
			if (!currentTarget.contains(document.activeElement)) {
				setNewPost(false);
			}
		}, 0);
	};
	const addPost = () => {
		server
			.post('/posts', post)
			.then(() => {
				setPost({ title: '', body: '' });
				setNewPost(false);
				server
					.get('/posts')
					.then(({ data }) => {
						setPosts(data);
					})
					.catch(error => console.log(error));
			})
			.catch(error => console.log(error));
	};

	return (
		<NewPostWrapper onBlur={handleBlur}>
			{newPost ? (
				<InnerWrapper>
					<Button
						style={{ position: 'absolute', top: '5px', right: '5px' }}
						icon='pi pi-times'
						onClick={() => setNewPost(false)}
					/>
					<Input
						inputRef={input}
						value={post.title}
						onChange={e => setPost({ ...post, title: e.target.value })}
						label='Title'
					/>
					<TextArea
						value={post.body}
						onChange={e => setPost({ ...post, body: e.target.value })}
					/>
					<Button label='Submit' disabled={!post.title || !post.body} onClick={addPost} />
				</InnerWrapper>
			) : (
				<Button label='Create a New Post' onClick={() => setNewPost(true)} full />
			)}
		</NewPostWrapper>
	);
};

export default NewPost;
