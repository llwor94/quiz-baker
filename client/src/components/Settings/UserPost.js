import React, { useEffect, useContext, useState } from 'react';
import { UserPostsCtx } from '../../pages/Settings';
import moment from 'moment';
import { UserCtx } from '../../App';
import { Dialog } from 'primereact/dialog';
import { Growl } from 'primereact/growl';
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
import server from '../../utils/server';

const UserPost = ({ post, ...props }) => {
	const [ userPosts, setUserPosts ] = useContext(UserPostsCtx);
	const [ modalVisable, setModalVisable ] = useState(false);
	const [ user, setUser ] = useContext(UserCtx);

	const deletePost = () => {
		server
			.delete(`posts/${post.id}`)
			.then(response => {
				server.get('/posts').then(({ data }) => {
					setUserPosts(
						data
							.filter(post => post.author === user.username)
							.sort((a, b) => b.id - a.id),
					);
					setModalVisable(false);
				});
			})
			.catch(error => console.log(error));
	};

	const footer = (
		<div>
			<Button label='Yes' icon='pi pi-check' onClick={deletePost} />
			<Button
				label='No'
				icon='pi pi-times'
				onClick={() => setModalVisable(false)}
				secondary
			/>
		</div>
	);
	return (
		<PostWrapper userPage>
			<Dialog
				visible={modalVisable}
				style={{ width: '25vw' }}
				footer={footer}
				onHide={() => setModalVisable(false)}
			>
				Are you sure you'd like to delete this post? This action cannot be undone.
			</Dialog>
			<InnerWrapper>
				<BodyWrapper onClick={() => props.history.push(`/forum/${post.id}`)}>
					<Title>{post.title}</Title>

					<p>{post.body}</p>
				</BodyWrapper>

				<FooterWrapper>
					<div style={{ display: 'flex' }}>
						<CommentCount>
							{post.comment_count === 1 ? (
								'1 comment'
							) : (
								`${post.comment_count} comments`
							)}
						</CommentCount>

						<span style={{ padding: '0 3px' }}>&#8226;</span>
						<span>Posted {moment(post.created_at).fromNow()}</span>
					</div>
					<Button white icon='pi pi-trash' onClick={() => setModalVisable(true)} />
				</FooterWrapper>
			</InnerWrapper>
		</PostWrapper>
	);
};

export default UserPost;
