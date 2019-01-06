import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { fetchPosts } from '../../store/actions/forumActions';
import { Post as PostWrapper } from '../../components/Forum/Post';

const Post = ({ post, user, token, fetchPosts, ...props }) => {
	const [ modalVisable, setModalVisable ] = useState(false);

	const deletePost = () => {
		axios({
			method: 'delete',
			url: `https://lambda-study-app.herokuapp.com/api/posts/${post.id}`,
			headers: {
				authorization: token,
			},
		})
			.then(({ data }) => {
				fetchPosts();
				setModalVisable(false);
			})
			.catch(err => console.log(err));
	};

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

const mapStateToProps = ({ forumReducer, authReducer }) => ({
	loading: forumReducer.loading,
	token: authReducer.token,
});
export default connect(mapStateToProps, { fetchPosts })(Post);
