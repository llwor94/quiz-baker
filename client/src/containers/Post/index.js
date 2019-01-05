import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { NewComment } from '../../components/Forum/Comment';
import { Post as PostWrapper } from '../../components/Forum/Post';
const Post = ({ post, user, ...props }) => {
	return (
		<PostWrapper post={post} user={user}>
			{user && <NewComment user={user} />}
		</PostWrapper>
	);
};

const mapStateToProps = ({ forumReducer }) => ({
	post: forumReducer.post,
	loading: forumReducer.loading,
});
export default connect(mapStateToProps)(Post);
