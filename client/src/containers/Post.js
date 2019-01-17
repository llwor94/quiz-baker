import React, { useState, useEffect, useContext, Fragment } from 'react';

import { PostCtx } from '../pages/Post';
import server from '../utils/server';
import Loading from '../components/Styles/Loading';
import Post from '../components/Post';

const PostContainer = props => {
	const [ post, setPost ] = useContext(PostCtx);
	useEffect(() => {
		server.get(`/posts/${props.match.params.id}`).then(({ data }) => {
			console.log(data);
			setPost(data);
		});
	}, []);
	if (!post) return <Loading />;
	else
		return (
			<Fragment>
				<Post {...props} />
			</Fragment>
		);
};

export default PostContainer;
