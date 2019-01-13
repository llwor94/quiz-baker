import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import server from '../../../utils/server';

import { CommentArea, Comment, NewComment } from '../../../components/Forum/Comment';
import { Button } from '../../../components/Quizzes/button';
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
				fetchPost(post.id);
			})
			.catch(error => console.log(error));
	};
	return (
		<Fragment>
			{user &&
				(!newComment ? (
					<Button text='Post a Comment' handleClick={() => setNewComment(true)} post />
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
		</Fragment>
	);
};
const mapStateToProps = ({ forumReducer, authReducer }) => ({
	post: forumReducer.post,
	loading: forumReducer.loading,
	user: authReducer.user,
});

export default connect(mapStateToProps, { fetchPost })(Comments);
