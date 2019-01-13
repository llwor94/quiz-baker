import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import server from '../../utils/server';

import { fetchPosts } from '../../store/actions/forumActions';
import { NewPost } from '../../components/Forum/Post';
import Post from '../Post';

const Posts = ({ fetchPosts, posts, user, ...props }) => {
	const [ newPost, setNewPost ] = useState(false);
	const [ post, setPost ] = useState({ title: '', body: '' });

	const getPost = id => {
		props.history.push(`forum/${id}`);
	};

	const addPost = () => {
		server
			.post('/posts', post)
			.then(({ data }) => {
				setPost({ title: '', body: '' });
				setNewPost(false);
				fetchPosts();
			})
			.catch(error => console.log(error));
	};

	return (
		<Fragment>
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
					<Post key={post.id} user={user} post={post} getPost={() => getPost(post.id)} />
				))}{' '}
			</div>
		</Fragment>
	);
};

const mapStateToProps = ({ forumReducer, authReducer }) => ({
	posts: forumReducer.posts,
	loading: forumReducer.loading,
	user: authReducer.user,
});

export default connect(mapStateToProps, { fetchPosts })(Posts);
