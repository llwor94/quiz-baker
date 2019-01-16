import React, { useState, useContext, Fragment } from 'react';
import server from '../../../utils/server';
import { PostCtx } from '../../../pages/Post';
import { UserCtx } from '../../../App';
import Loading from '../../../components/Styles/Loading';
import { CommentArea, Comment, NewComment } from '../../../components/Forum/Comment';
import Button from '../../../components/Styles/Button';
import { fetchPost } from '../../../store/actions/forumActions';

const Comments = props => {
	const [ post, setPost ] = useContext(PostCtx);
	const [ user, setUser ] = useContext(UserCtx);
	const [ commentInput, setCommentInput ] = useState('');
	const [ newComment, setNewComment ] = useState(false);
	const deleteComment = id => {
		server
			.delete(`posts/${post.id}/comments/${id}`)
			.then(({ data }) => {
				server.get(`/posts/${post.id}`).then(({ data }) => {
					setPost(data);
				});
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
				server.get(`/posts/${post.id}`).then(({ data }) => {
					setPost(data);
				});
			})
			.catch(error => console.log(error));
	};
	if (!post) return <Loading />;
	else
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
						{post.comments
							.sort((a, b) => b.id - a.id)
							.map(comment => (
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

export default Comments;
