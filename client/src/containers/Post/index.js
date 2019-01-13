import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import server from '../../utils/server';
import { Growl } from 'primereact/growl';
import { fetchPosts } from '../../store/actions/forumActions';
import { Post as PostWrapper } from '../../components/Forum/Post';

const Post = ({ user, fetchPosts, singlePost, ...props }) => {
	const [ modalVisable, setModalVisable ] = useState(false);
	const [ post, setPost ] = useState(props.post);
	const growl = React.createRef();
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
	const handleCopy = id => {
		let value = `http://localhost:3000/forum/${id}`;
		navigator.clipboard.writeText(value).then(() => {
			growl.current.show({ severity: 'info', summary: 'Link Copied!' });
		});
	};
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
				<Growl ref={growl} />
				<PostWrapper
					post={post}
					user={user}
					handleClick={props.getPost}
					handleDelete={deletePost}
					handleCopy={() => handleCopy(post.id)}
					setModalVisable={setModalVisable}
					modalVisable={modalVisable}
				/>
			</Fragment>
		);
};

const mapStateToProps = ({ forumReducer, authReducer }) => ({
	singlePost: forumReducer.post,
	loading: forumReducer.loading,
	user: authReducer.user,
});
export default connect(mapStateToProps, { fetchPosts })(Post);
