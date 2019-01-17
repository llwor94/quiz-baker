import React, { useState, useEffect, useContext, Fragment } from 'react';

import { PostCtx } from '../pages/Post';
import { UserCtx } from '../App';
import server from '../utils/server';
import Loading from '../components/Styles/Loading';
import Post from '../components/Post';
import NewComment from '../components/Post/NewComment';
import Comments from '../components/Post/Comments';

import { Button } from '../Styles/Components/Button';

const PostContainer = props => {
	const [ post, setPost ] = useContext(PostCtx);
	const [ user, setUser ] = useContext(UserCtx);
	useEffect(() => {
		server.get(`/posts/${props.match.params.id}`).then(({ data }) => {
			console.log(data);
			setPost(data);
		});
	}, []);

	const handlePush = () => {
		props.history.goBack();
	};
	if (!post) return <Loading />;
	else
		return (
			<div style={{ width: '500px', position: 'relative' }}>
				<Button
					style={{ position: 'absolute', top: 0, left: -68 }}
					secondary
					icon='pi pi-arrow-left'
					onClick={handlePush}
				/>
				<Post {...props} />
				{user && <NewComment />}
				{post.comments.length > 0 && <Comments />}
			</div>
		);
};

export default PostContainer;
