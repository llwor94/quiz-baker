import React, { useContext, useState } from 'react';
import moment from 'moment';
import { Dialog } from 'primereact/dialog';

import server from '../../utils/server';

import { AuthCtx } from '../../Auth';

import { UserPostsCtx } from '../../pages/Settings';
import { Button } from '../../Styles/Components/Button';
import { PostWrapper, BodyWrapper, Title, InnerWrapper, Topic } from '../../Styles/Posts/Post';
import { FooterWrapper } from '../../Styles/Settings/UserQuiz';

const UserPost = ({ post, ...props }) => {
	const [ userPosts, setUserPosts ] = useContext(UserPostsCtx);
	const [ modalVisable, setModalVisable ] = useState(false);
	const { user } = useContext(AuthCtx);

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
					<div className='header'>
						{' '}
						<div className='header'>
							<Title>{post.title}</Title>

							<span className='text'>Posted {moment(post.created_at).fromNow()}</span>
						</div>
						{post.topic && <Topic>{post.topic}</Topic>}
					</div>

					<p>{post.body}</p>
				</BodyWrapper>

				<FooterWrapper>
					<div style={{ display: 'flex' }}>
						<a style={{ cursor: 'default', fontWeight: 'bold' }}>
							{post.comment_count === 1 ? (
								'1 comment'
							) : (
								`${post.comment_count} comments`
							)}
						</a>
						<span style={{ padding: '0 3px' }}>&#8226;</span>
						<a style={{ cursor: 'default', fontWeight: 'bold' }}>
							{post.votes === 1 ? '1 vote' : `${post.votes} votes`}
						</a>
					</div>
					<Button white icon='pi pi-trash' onClick={() => setModalVisable(true)} />
				</FooterWrapper>
			</InnerWrapper>
		</PostWrapper>
	);
};

export default UserPost;
