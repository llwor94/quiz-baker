import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';

import { Post as PostWrapper } from '../../components/Forum/Post';
const Post = ({ post, user, ...props }) => {
	console.log(user);
	return (
		<Fragment>
			<PostWrapper post={post} user={user} />
		</Fragment>
	);
};

const mapStateToProps = ({ forumReducer }) => ({
	post: forumReducer.post,
	loading: forumReducer.loading,
});
export default connect(mapStateToProps)(Post);
