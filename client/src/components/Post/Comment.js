import React, { useContext } from 'react';
import { Wrapper, CommentHeader, UserName, CommentBody } from '../../Styles/Comments/Comment';
import { ProfileIcon } from '../../Styles/Components/Image';
import { UserCtx } from '../../App';
import { Button } from '../../Styles/Components/Button';
import moment from 'moment';

const Comment = ({ comment, deleteComment }) => {
	const [ user, setUser ] = useContext(UserCtx);
	return (
		<Wrapper>
			<div>
				<CommentHeader>
					<ProfileIcon src={comment.author_img} />
					Posted by <UserName>{comment.author}</UserName>
					<span style={{ padding: '0 3px' }}>&#8226;</span>
					<span>{moment(comment.created_at).fromNow()}</span>
				</CommentHeader>
				<CommentBody>
					<p>{comment.text}</p>
				</CommentBody>
			</div>
			{user &&
			user.username === comment.author && (
				<Button label='delete' onClick={() => deleteComment(comment.id)} />
			)}
		</Wrapper>
	);
};

export default Comment;
