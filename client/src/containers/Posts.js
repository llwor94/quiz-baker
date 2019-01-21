import React, { useState, useEffect, useContext } from 'react';
import { PostsCtx } from '../pages/Forum';
import { UserCtx } from '../App';
import { Wrapper } from '../Styles/Posts';
import server from '../utils/server';
import Loading from '../components/Styles/Loading';
import CommentsView from '../components/Posts/CommentsView';
import NewPost from '../components/Posts/NewPost';
import Post from '../components/Posts/Post';

const Posts = props => {
	const [ posts, setPosts ] = useContext(PostsCtx);
	const [ user, setUser ] = useContext(UserCtx);
	const [ currentPost, setCurrentPost ] = useState(undefined);
	useEffect(() => {
		server
			.get('/posts')
			.then(({ data }) => {
				setPosts(data.sort((a, b) => b.id - a.id));
			})
			.catch(error => console.log(error.response));
	}, []);

	if (!posts) return <Loading />;
	else
		return (
			<Wrapper>
				<div style={{ width: '400px' }} />
				<div
					style={{
						width: '500px',
						flexDirection: 'column',

						alignItems: 'center',
					}}
				>
					{user && <NewPost />}
					{posts.map(post => (
						<Post
							key={post.id}
							post={post}
							{...props}
							showComments={() => setCurrentPost(post.id)}
						/>
					))}
				</div>
				<CommentsView currentPost={currentPost} />
			</Wrapper>
		);
};

export default Posts;
