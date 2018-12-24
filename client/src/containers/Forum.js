import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchPosts } from '../store/actions/forumActions';

const Forum = ({ fetchPosts, posts, ...props }) => {
	useEffect(() => fetchPosts());
	return (
		<div>
			<p>Hii</p>
			Hellooo
		</div>
	);
};

const mapStateToProps = ({ forumReducer }) => ({
	posts: forumReducer.posts,
});

export default connect(mapStateToProps, { fetchPosts })(Forum);
