import React from 'react';
import { connect } from 'react-redux';

import { fetchPost } from '../store/actions/forumActions';
import {
	ForumWrapper,
	Post as PostWrapper,
	NewComment,
	CommentArea,
	Comment,
} from '../components/Forum/Post';

const Post = ({ user, post, loading, fetchPost, ...props }) => {
	console.log(props.match);
	if (loading) return <div>Loading...</div>;
	else if (post)
		return (
			<ForumWrapper>
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
			</ForumWrapper>
		);
	else
		return (
			<div>
				<button onClick={() => fetchPost(props.match.params.id)}>Click me</button>
			</div>
		);
};

const mapStateToProps = ({ forumReducer }) => ({
	post: forumReducer.post,
	loading: forumReducer.loading,
});

export default connect(mapStateToProps, { fetchPost })(Post);
