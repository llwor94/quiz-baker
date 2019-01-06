import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import server from '../../utils/server';

import { fetchPosts } from '../../store/actions/forumActions';
import { Post as PostWrapper } from '../../components/Forum/Post';

const Post = ({ user, fetchPosts, singlePost, ...props }) => {
	const [ modalVisable, setModalVisable ] = useState(false);
	const [ post, setPost ] = useState(props.post);
	useEffect(
		() => {
			if (singlePost) {
				setPost(singlePost);
			} else {
				setPost(props.post);
			}
		},
		[ singlePost ],
	);
	const deletePost = () => {
		server
			.delete(`posts/${post.id}`)
			.then(({ data }) => {
				fetchPosts();
				setModalVisable(false);
			})
			.catch(err => console.log(err));
	};

	if (post === undefined) return <div>Loading...</div>;
	else
		return (
			<Fragment>
				<PostWrapper
					post={post}
					user={user}
					handleClick={props.getPost}
					handleDelete={deletePost}
					setModalVisable={setModalVisable}
					modalVisable={modalVisable}
				/>
			</Fragment>
		);
};

const mapStateToProps = ({ forumReducer }) => ({
	singlePost: forumReducer.post,
	loading: forumReducer.loading,
});
export default connect(mapStateToProps, { fetchPosts })(Post);
