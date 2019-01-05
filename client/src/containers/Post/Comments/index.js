import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import { CommentArea, Comment } from '../../../components/Forum/Comment';

const Comments = ({ user, post, ...props }) => {
	return (
		<Fragment>
			{post.comments.length && (
				<CommentArea>
					{post.comments.map(comment => <Comment key={comment.id} comment={comment} />)}
				</CommentArea>
			)}
		</Fragment>
	);
};
const mapStateToProps = ({ forumReducer }) => ({
	post: forumReducer.post,
	loading: forumReducer.loading,
});

export default connect(mapStateToProps)(Comments);
