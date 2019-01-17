import React, { useState, useContext, useEffect, Fragment } from 'react';
import server from '../../utils/server';
import { PostCtx } from '../../pages/Post';
import { Button } from '../../Styles/Components/Button';
import { TextArea } from '../../Styles/Components/Input';
import { NewCommentArea } from '../../Styles/Comments/NewComment';

const NewComment = () => {
	const [ post, setPost ] = useContext(PostCtx);
	const [ commentInput, setCommentInput ] = useState('');
	const [ newComment, setNewComment ] = useState(false);
	let input = React.createRef();
	// // useEffect(() => {
	// // 	input.current.focus();
	// // }, []);
	const openInput = () => {
		setNewComment(true);
		//input.current.focus();
	};
	const handleBlur = e => {
		//input.current.blur();
		console.log(e);
		let currentTarget = e.currentTarget;
		console.log(currentTarget);
		setTimeout(() => {
			if (!currentTarget.contains(document.activeElement)) {
				setNewComment(false);
			}
		}, 0);
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
	if (!newComment) return <Button label='Post a Comment' onClick={openInput} full />;
	else
		return (
			<NewCommentArea onBlur={handleBlur}>
				<TextArea
					inputRef={input}
					value={commentInput}
					onChange={e => setCommentInput(e.target.value)}
				/>
				<Button label='Comment' onClick={addComment} disabled={!commentInput} />
			</NewCommentArea>
		);
};

export default NewComment;
