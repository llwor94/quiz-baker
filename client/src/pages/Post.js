import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import { fetchPost } from '../store/actions/forumActions';
import PostContainer from '../containers/Post/index';
import CommentsContainer from '../containers/Post/Comments';

const PostPage = ({ fetchPost, post, ...props }) => {
	useEffect(() => {
		fetchPost(props.match.params.id);
	}, []);

	if (!post) return <div>Loading...</div>;
	else
		return (
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<PostContainer {...props} />
				<CommentsContainer />
			</div>
		);
};

const mapStateToProps = ({ forumReducer }) => ({
	post: forumReducer.post,
	loading: forumReducer.loading,
});

export default connect(mapStateToProps, { fetchPost })(PostPage);
