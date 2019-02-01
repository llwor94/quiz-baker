import React, { useState, useEffect, useContext } from 'react';
import { PostsCtx } from '../pages/Forum';
import { AuthCtx } from '../Auth';
import { Wrapper } from '../Styles/Posts';
import server from '../utils/server';
import Loading from '../components/Loading';
import CommentsView from '../components/Posts/CommentsView';
import NewPost from '../components/Posts/NewPost';
import Post from '../components/Posts/Post';
import Topics from '../components/Posts/Topics';
import MediaQuery from 'react-responsive';

const Posts = props => {
	const [ posts, setPosts ] = useContext(PostsCtx);
	const { user } = useContext(AuthCtx);
	const [ currentPost, setCurrentPost ] = useState(undefined);
	useEffect(() => {
		server
			.get('/posts')
			.then(({ data }) => {
				setPosts(data.sort((a, b) => b.id - a.id));
			})
			.catch(error => console.log(error.response));
	}, []);

	const handleComments = id => {
		if (id === currentPost) {
			setCurrentPost(undefined);
		} else {
			setCurrentPost(id);
		}
	};
	console.log(currentPost);
	if (!posts) return <Loading />;
	else
		return (
			<Wrapper>
				<MediaQuery minWidth={1200}>
					<div style={{ width: '20%', display: 'flex', justifyContent: 'center' }}>
						<Topics />
					</div>
				</MediaQuery>
				<div className='posts'>
					<div className='post-wrapper'>
						<div className='new-post'>{user && <NewPost />}</div>
						{posts.map(post => (
							<Post
								key={post.id}
								post={post}
								{...props}
								showComments={() => handleComments(post.id)}
								currentPost={currentPost}
							/>
						))}
					</div>
				</div>
				<MediaQuery minWidth={1000}>
					<CommentsView currentPost={currentPost} setCurrentPost={setCurrentPost} />
				</MediaQuery>
			</Wrapper>
		);
};

export default Posts;
