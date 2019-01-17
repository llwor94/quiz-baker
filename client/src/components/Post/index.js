import React, { useEffect, useState, useContext } from 'react';

import moment from 'moment';

import server from '../../utils/server';
import { Growl } from 'primereact/growl';
import { Dialog } from 'primereact/dialog';
import { Button } from '../../Styles/Components/Button';
import {
	PostWrapper,
	BodyWrapper,
	Header,
	FooterWrapper,
	CommentCount,
	Title,
	InnerWrapper,
} from '../../Styles/Posts/Post';
import { ProfileIcon } from '../../Styles/Components/Image';

import { UserCtx } from '../../App';
import { PostCtx } from '../../pages/Post';
const Post = props => {
	const [ modalVisable, setModalVisable ] = useState(false);
	const [ post, setPost ] = useContext(PostCtx);
	const [ user, setUser ] = useContext(UserCtx);

	const growl = React.createRef();
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
				setModalVisable(false);
				props.history.push(`/forum`);
			})
			.catch(err => console.log(err));
	};

	const footer = (
		<div>
			<Button
				label='Yes'
				icon='pi pi-check'
				onClick={deletePost}
				className='p-button-danger'
			/>
			<Button
				label='No'
				icon='pi pi-times'
				onClick={() => setModalVisable(false)}
				className='p-button-secondary'
			/>
		</div>
	);
	return (
		<PostWrapper>
			<Growl ref={growl} />
			<InnerWrapper>
				<Header>
					<ProfileIcon src={post.author.img_url} />
					Posted by <a>{post.author.username}</a>
					<span style={{ padding: '0 3px' }}>&#8226;</span>
					{moment(post.created_at).fromNow()}
				</Header>
				<BodyWrapper>
					<Title>{post.title}</Title>

					<p>{post.body}</p>
				</BodyWrapper>
				<FooterWrapper>
					<CommentCount>
						{post.comments.length === 1 ? (
							'1 comment'
						) : (
							`${post.comments.length} comments`
						)}
					</CommentCount>
					<a onClick={handleCopy}>Share</a>
					{user &&
						(user.username === post.author.username && (
							<a label='delete' onClick={() => setModalVisable(true)}>
								Delete
							</a>
						))}
					<Dialog
						visible={modalVisable}
						style={{ width: '25vw' }}
						footer={footer}
						onHide={() => setModalVisable(false)}
					>
						Are you sure you'd like to delete this post? This action cannot be undone.
					</Dialog>
				</FooterWrapper>
			</InnerWrapper>
		</PostWrapper>
	);
};

export default Post;
