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
				<div style={{ flexGrow: 1, marginLeft: '-316px' }} />
				<div
					style={{
						maxWidth: '500px',
						flexGrow: 1,
						flexDirection: 'column',
						marginTop: '40px',
						alignItems: 'center',
					}}
					onMouseLeave={e => console.log(e.target)}
				>
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

				<CommentsView currentPost={currentPost} />
			</Wrapper>
		);
};

export default Posts;
