import React, { useState, useEffect, useContext, Fragment } from 'react';
import { PostsCtx } from '../../pages/Forum';
import { PostCtx } from '../../pages/Post';
import server from '../../utils/server';
import { Growl } from 'primereact/growl';
import { Post as PostWrapper } from '../../components/Forum/Post';
import Loading from '../../components/Styles/Loading';

const Post = props => {
	const [ modalVisable, setModalVisable ] = useState(false);
	const [ post, setPost ] = useContext(PostCtx);
	const [ posts, setPosts ] = useContext(PostsCtx);

	const growl = React.createRef();
	useEffect(() => {
		server.get(`/posts/${props.match.params.id}`).then(({ data }) => {
			setPost(data);
		});
	}, []);
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
				server.get('/posts').then(({ data }) => {
					setPosts(data);
				});
				setModalVisable(false);
			})
			.catch(err => console.log(err));
	};
	if (!post) return <Loading />;
	else
		return (
			<Fragment>
				<Growl ref={growl} />
				<PostWrapper
					post={post}
					handleClick={props.getPost}
					handleDelete={deletePost}
					handleCopy={() => handleCopy(post.id)}
					setModalVisable={setModalVisable}
					modalVisable={modalVisable}
				/>
			</Fragment>
		);
};

export default Post;
