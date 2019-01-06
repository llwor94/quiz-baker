import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import server from '../../../utils/server';

import { CommentArea, Comment, NewComment } from '../../../components/Forum/Comment';
import { fetchPost } from '../../../store/actions/forumActions';

const Comments = ({ user, post, fetchPost, ...props }) => {
	const [ commentInput, setCommentInput ] = useState('');

	const deleteComment = id => {
		server
			.delete(`posts/${post.id}/comments/${id}`)
			.then(({ data }) => {
				console.log(data);
				fetchPost(post.id);
			})
			.catch(error => console.log(error));
	};

	const addComment = () => {
		server
			.post(`posts/${post.id}/comments`, { text: commentInput })
			.then(({ data }) => {
				console.log(data);
				setCommentInput('');
				fetchPost(post.id);
			})
			.catch(error => console.log(error));
	};
	return (
		<Fragment>
			<CommentArea>
				{user && (
					<NewComment
						user={user}
						commentInput={commentInput}
						setCommentInput={setCommentInput}
						handleClick={addComment}
					/>
				)}

				{post.comments.length &&
					post.comments.map(comment => (
						<Comment
							key={comment.id}
							comment={comment}
							user={user}
							handleClick={() => deleteComment(comment.id)}
						/>
					))}
			</CommentArea>
		</Fragment>
	);
};
const mapStateToProps = ({ forumReducer }) => ({
	post: forumReducer.post,
	loading: forumReducer.loading,
});

export default connect(mapStateToProps, { fetchPost })(Comments);
