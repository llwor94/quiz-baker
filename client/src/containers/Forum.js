import React, { useState } from 'react';
import { connect } from 'react-redux';

import { fetchPosts, fetchPost } from '../store/actions/forumActions';
import { LilPost, ForumWrapper } from '../components/Forum/Post';

const Forum = ({ fetchPosts, fetchPost, posts, loading, ...props }) => {
	const getPost = id => {
		fetchPost(id);
		props.history.push(`forum/${id}`);
	};
	if (loading) return <div>Loading...</div>;
	else if (posts)
		return (
			<ForumWrapper>
				{posts.map(post => <LilPost post={post} handleClick={() => getPost(post.id)} />)}
			</ForumWrapper>
		);
	else
		return (
			<div>
				<button onClick={() => fetchPosts()}>Click me</button>
			</div>
		);
};

const mapStateToProps = ({ forumReducer }) => ({
	posts: forumReducer.posts,
	loading: forumReducer.loading,
});

export default connect(mapStateToProps, { fetchPosts, fetchPost })(Forum);
