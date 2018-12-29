import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchPost } from '../store/actions/forumActions';
import { Post as PostWrapper } from '../components/Forum/Post';
import { NewComment, CommentArea, Comment } from '../components/Forum/Comment';

const Post = ({ user, post, loading, fetchPost, ...props }) => {
	useEffect(
		() => {
			if (!post) {
				fetchPost(props.match.params.id);
			}
		},
		[ post ],
	);

	if (post)
		return (
			<PostWrapper post={post} user={user}>
				{user && <NewComment user={user} />}
				{post.comments.length && (
					<CommentArea>
						{post.comments.map(comment => (
							<Comment key={comment.id} comment={comment} />
						))}
					</CommentArea>
				)}
			</PostWrapper>
		);
	else return <div>Loading...</div>;
};

const mapStateToProps = ({ forumReducer }) => ({
	post: forumReducer.post,
	loading: forumReducer.loading,
});

export default connect(mapStateToProps, { fetchPost })(Post);
