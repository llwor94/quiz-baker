import React, { useState, useEffect, useContext } from 'react';
import { PostsCtx } from '../../pages/Forum';
import { UserCtx } from '../../App';

import server from '../../utils/server';
import Loading from '../../components/Styles/Loading';
import { NewPost, Post } from '../../components/Forum/Post';

const Posts = props => {
	const [ posts, setPosts ] = useContext(PostsCtx);
	const [ user, setUser ] = useContext(UserCtx);
	const [ newPost, setNewPost ] = useState(false);
	const [ post, setPost ] = useState({ title: '', body: '' });

	useEffect(() => {
		server
			.get('/posts')
			.then(({ data }) => {
				setPosts(data.sort((a, b) => b.id - a.id));
			})
			.catch(err => console.log(err));
	}, []);
	console.log(user);
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
	if (!posts) return <Loading />;
	else
		return (
			<div
				style={{
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<div style={{ width: '500px' }}>
					{user && (
						<NewPost
							newPost={newPost}
							setNewPost={setNewPost}
							post={post}
							setPost={setPost}
							handleSubmit={addPost}
							{...props}
						/>
					)}
					{posts.map(post => (
						<Post
							key={post.id}
							user={user}
							post={post}
							getPost={() => props.history.push(`forum/${post.id}`)}
						/>
					))}
				</div>
			</div>
		);
};

export default Posts;
