import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchPosts, fetchPost } from '../../store/actions/forumActions';
import { Post } from '../../components/Forum/Post';

const Posts = ({ fetchPosts, fetchPost, posts, ...props }) => {
	const getPost = id => {
		fetchPost(id);
		props.history.push(`forum/${id}`);
	};

	return posts.map(post => <Post post={post} handleClick={() => getPost(post.id)} />);
};

const mapStateToProps = ({ forumReducer }) => ({
	posts: forumReducer.posts,
	loading: forumReducer.loading,
});

export default connect(mapStateToProps, { fetchPosts, fetchPost })(Posts);
