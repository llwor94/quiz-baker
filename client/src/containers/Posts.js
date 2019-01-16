import React, { useState, useEffect, useContext } from 'react';
import { PostsCtx } from '../pages/Forum';
import { UserCtx } from '../App';

import server from '../utils/server';
import Loading from '../components/Styles/Loading';
import { Post } from '../components/Forum/Post';
import NewPost from '../components/Posts/NewPost';

const Posts = props => {
	const [ posts, setPosts ] = useContext(PostsCtx);
	const [ user, setUser ] = useContext(UserCtx);

	useEffect(() => {
		server
			.get('/posts')
			.then(({ data }) => {
				setPosts(data.sort((a, b) => b.id - a.id));
			})
			.catch(err => console.log(err));
	}, []);

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
					{user && <NewPost />}
					{posts.map(post => (
						<Post
							key={post.id}
							user={user}
							post={post}
							handleClick={() => props.history.push(`forum/${post.id}`)}
						/>
					))}
				</div>
			</div>
		);
};

export default Posts;
