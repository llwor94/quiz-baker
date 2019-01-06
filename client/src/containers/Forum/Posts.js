import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { fetchPosts } from '../../store/actions/forumActions';
import { NewPost } from '../../components/Forum/Post';
import Post from '../Post';

const Posts = ({ fetchPosts, fetchPost, posts, user, token, ...props }) => {
	const [ newPost, setNewPost ] = useState(false);
	const [ postInput, setPostInput ] = useState('');
	const [ postTitle, setPostTitle ] = useState('');
	const getPost = id => {
		props.history.push(`forum/${id}`);
	};

	const addPost = () => {
		console.log(postInput, postTitle, token);
		axios({
			method: 'post',
			url: 'https://lambda-study-app.herokuapp.com/api/posts',
			data: { title: postTitle, body: postInput },
			headers: {
				authorization: token,
			},
		})
			.then(({ data }) => {
				setPostInput('');
				setPostTitle('');
				setNewPost(false);
				fetchPosts();
			})
			.catch(error => console.log(error));
	};

	return (
		<Fragment>
			{user && (
				<NewPost
					newPost={newPost}
					setNewPost={setNewPost}
					postInput={postInput}
					setPostInput={setPostInput}
					postTitle={postTitle}
					setPostTitle={setPostTitle}
					handleSubmit={addPost}
				/>
			)}
			{posts.map(post => (
				<Post user={user} post={post} getPost={() => getPost(post.id)} />
			))}{' '}
		</Fragment>
	);
};

const mapStateToProps = ({ forumReducer, authReducer }) => ({
	posts: forumReducer.posts,
	loading: forumReducer.loading,
	token: authReducer.token,
});

export default connect(mapStateToProps, { fetchPosts })(Posts);
