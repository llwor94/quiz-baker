import React, { useState, useEffect, useContext } from 'react';
import Comment from '../Post/Comment';
import server from '../../utils/server';
import { AuthCtx } from '../../Auth';
import { ProfileIcon } from '../../Styles/Components/Image';
import { CommentWrapper, PostComment } from '../../Styles/Comments/Comment';
import { CommentsWrapper, InnerWrapper } from '../../Styles/Posts';
import { EmojiInput } from '../../Styles/Components/Input';
import quizbaker from '../../assets/quizbaker.png';

const Comments = ({ currentPost }) => {
	const [ comments, setComments ] = useState(undefined);
	const [ showing, setShowing ] = useState(false);
	const { user } = useContext(AuthCtx);
	const [ commentInput, setCommentInput ] = useState('');
	useEffect(
		() => {
			if (currentPost) {
				setShowing(true);
				server.get(`/posts/${currentPost}/comments`).then(({ data }) => {
					setComments(data.sort((a, b) => b.id - a.id));
				});
			} else {
				setShowing(false);
				setComments(undefined);
			}
		},
		[ currentPost ],
	);

	const addComment = () => {};
	if (!showing)
		return (
			<CommentsWrapper>
				<div className='image'>
					<img className='quizBaker' src={quizbaker} />
				</div>
			</CommentsWrapper>
		);
	if (!comments)
		return (
			<CommentsWrapper>
				<InnerWrapper />
			</CommentsWrapper>
		);
	else
		return (
			<CommentsWrapper>
				<InnerWrapper comments={comments}>
					<div className='inner'>
						<PostComment>
							<ProfileIcon src={user.img_url} />
							<EmojiInput
								placeholder='Post a comment'
								value={commentInput}
								onChange={e => setCommentInput(e.target.value)}
								handleSelect={e => setCommentInput(commentInput + e.native)}
								onKeyUp={e => {
									if (e.keyCode === 13) {
										addComment();
									}
								}}
								style={{ flexGrow: 1 }}
							/>
						</PostComment>
						{comments.map(comment => <Comment key={comment.id} comment={comment} />)}
					</div>
				</InnerWrapper>
			</CommentsWrapper>
		);
};

export default Comments;
