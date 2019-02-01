import React, { useState, useEffect, useContext, Fragment } from 'react';

import { PostCtx } from '../pages/Post';
import { AuthCtx } from '../Auth';
import server from '../utils/server';
import Loading from '../components/Loading';
import Post from '../components/Post';
import NewComment from '../components/Post/NewComment';
import Comments from '../components/Post/Comments';

const PostContainer = props => {
	const [ post, setPost ] = useContext(PostCtx);
	const { user } = useContext(AuthCtx);
	useEffect(() => {
		server.get(`/posts/${props.match.params.id}`).then(({ data }) => {
			console.log(data);
			setPost(data);
		});
	}, []);

	if (!post) return <Loading />;
	else
		return (
			<div style={{ width: '500px', position: 'relative', marginTop: '70px' }}>
				<Post {...props} />
				{user && <NewComment />}
				{post.comments.length > 0 && <Comments />}
			</div>
		);
};

export default PostContainer;
