import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchPosts } from '../store/actions/forumActions';
import PostsContainer from '../containers/Forum/Posts';
import Loading from '../components/Styles/Loading';

const ForumPage = ({ fetchPosts, posts, ...props }) => {
	useEffect(() => {
		fetchPosts();
	}, []);

	if (!posts) return <Loading />;
	else return <PostsContainer {...props} />;
};

const mapStateToProps = ({ forumReducer }) => ({
	posts: forumReducer.posts,
	loading: forumReducer.loading,
});

export default connect(mapStateToProps, { fetchPosts })(ForumPage);
