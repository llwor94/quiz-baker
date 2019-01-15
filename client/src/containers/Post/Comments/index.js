import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import server from '../../../utils/server';

import { CommentArea, Comment, NewComment } from '../../../components/Forum/Comment';
import Button from '../../../components/Styles/Button';
import { fetchPost } from '../../../store/actions/forumActions';

const Comments = ({ user, post, fetchPost, ...props }) => {
	const [ commentInput, setCommentInput ] = useState('');
	const [ newComment, setNewComment ] = useState(false);
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
				setNewComment(false);
				fetchPost(post.id);
			})
			.catch(error => console.log(error));
	};
	return (
		<div style={{ width: '500px' }}>
			{user &&
				(!newComment ? (
					<Button label='Post a Comment' onClick={() => setNewComment(true)} full />
				) : (
					<NewComment
						user={user}
						commentInput={commentInput}
						setCommentInput={setCommentInput}
						handleClick={addComment}
						handleClose={() => setNewComment(false)}
					/>
				))}

			{post.comments.length > 0 && (
				<CommentArea>
					{post.comments.map(comment => (
						<Comment
							key={comment.id}
							comment={comment}
							user={user}
							handleClick={() => deleteComment(comment.id)}
						/>
					))}
				</CommentArea>
			)}
		</div>
	);
};
const mapStateToProps = ({ forumReducer, authReducer }) => ({
	post: forumReducer.post,
	loading: forumReducer.loading,
	user: authReducer.user,
});

export default connect(mapStateToProps, { fetchPost })(Comments);
