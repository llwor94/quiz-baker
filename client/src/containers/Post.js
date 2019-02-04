import React, { useEffect, useContext } from 'react';

import server from 'server';

import { PostCtx } from 'pages/Post';
import { AuthCtx } from 'auth';

import Loading from 'components/Loading';
import Post from 'components/Post';
import NewComment from 'components/Post/NewComment';
import Comments from 'components/Post/Comments';

const PostContainer = props => {
	const [ post, setPost ] = useContext(PostCtx);

	useEffect(() => {
		server.get(`/posts/${props.match.params.id}`).then(({ data }) => {
			setPost(data);
		});
	}, []);

	if (!post) return <Loading />;
	else
		return (
			<div style={{ width: '500px', position: 'relative', marginTop: '70px' }}>
				<Post {...props} />
				<NewComment />
				{post.comments.length > 0 && <Comments />}
			</div>
		);
};

export default PostContainer;
