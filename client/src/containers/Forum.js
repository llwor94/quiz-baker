import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchPosts, fetchPost } from '../store/actions/forumActions';
import { Post } from '../components/Forum/Post';

const Forum = ({ fetchPosts, fetchPost, posts, loading, ...props }) => {
	useEffect(
		() => {
			if (!posts) {
				fetchPosts();
			}
		},
		[ posts ],
	);

	const getPost = id => {
		fetchPost(id);
		props.history.push(`forum/${id}`);
	};

	if (posts) return posts.map(post => <Post post={post} handleClick={() => getPost(post.id)} />);
	else return <div>Loading...</div>;
};

const mapStateToProps = ({ forumReducer }) => ({
	posts: forumReducer.posts,
	loading: forumReducer.loading,
});

export default connect(mapStateToProps, { fetchPosts, fetchPost })(Forum);
