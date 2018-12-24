import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchPosts } from '../store/actions/forumActions';
import { Post, ForumWrapper } from '../components/Forum/Post';

const Forum = ({ fetchPosts, posts, loading, ...props }) => {
	if (loading) return <div>Loading...</div>;
	else if (posts) return <ForumWrapper>{posts.map(post => <Post post={post} />)}</ForumWrapper>;
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

export default connect(mapStateToProps, { fetchPosts })(Forum);
