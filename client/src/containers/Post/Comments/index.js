import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { CommentArea, Comment, NewComment } from '../../../components/Forum/Comment';
import { addComment, fetchPost } from '../../../store/actions/forumActions';

const Comments = ({ user, post, addComment, token, fetchPost, ...props }) => {
	const [ commentInput, setCommentInput ] = useState('');

	const deleteComment = id => {
		axios({
			method: 'delete',
			url: `https://lambda-study-app.herokuapp.com/api/posts/${post.id}/comments/${id}`,
			headers: {
				authorization: token,
			},
		})
			.then(({ data }) => {
				console.log(data);
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
						handleClick={() => {
							addComment({ text: commentInput });
							setCommentInput('');
						}}
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
const mapStateToProps = ({ forumReducer, authReducer }) => ({
	post: forumReducer.post,
	loading: forumReducer.loading,
	token: authReducer.token,
});

export default connect(mapStateToProps, { addComment, fetchPost })(Comments);
