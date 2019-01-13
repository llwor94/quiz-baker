import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import blankProfile from '../../../assets/blank-profile.png';
import { Button } from 'primereact/button';

import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';

import { PostWrapper } from '../../Styles/Wrappers/index';
import { FooterWrapper, FooterLink } from '../../Styles/Wrappers/footer';
import { Title } from '../../Styles/Text/title';

const InnerWrapper = styled.div`
	padding: 8px 0;
	margin: 0 8px;
`;

const BodyWrapper = styled.div`
	max-height: 250px;
	overflow: hidden;
	p {
		font-size: 14px;
		font-weight: 400;
		line-height: 21px;
		mask-image: linear-gradient(180deg, #000 60%, transparent);
		color: ${props => props.theme.text};
	}
`;
const Header = styled.div`
	font-size: 12px;
	font-weight: 400;
	line-height: 16px;
	display: flex;
	align-items: center;
	margin-bottom: 8px;
	color: ${props => props.theme.link};
`;

const UserNameWrapper = styled.div`
	display: flex;
	align-items: center;
	img {
		height: 20px;
		width: 20px;
		margin-right: 3px;
		border-radius: 50%;
	}
`;

const UserName = styled.a`
	font-size: 12px;
	font-weight: 400;
	line-height: 16px;
	color: ${props => props.theme.accentRed};
	padding-left: 3px;
`;

export const Post = ({
	post,
	handleClick,
	handleDelete,
	setModalVisable,
	modalVisable,
	handleCopy,
	user,
	...props
}) => {
	let comment_count = post.hasOwnProperty('comment_count')
		? post.comment_count
		: post.comments.length;
	let img = post.author.img_url
		? post.author.img_url
		: post.author_img ? post.author_img : blankProfile;
	let username = post.author.username ? post.author.username : post.author;
	const footer = (
		<div>
			<Button
				label='Yes'
				icon='pi pi-check'
				onClick={handleDelete}
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
			<InnerWrapper>
				<Header>
					<UserNameWrapper>
						<img src={img} />
						Posted by <UserName>{username}</UserName>
					</UserNameWrapper>
					<span style={{ padding: '0 3px' }}>&#8226;</span>
					{moment(post.created_at).fromNow()}
				</Header>
				<Title onClick={handleClick}>{post.title}</Title>
				<BodyWrapper>
					<p>{post.body}</p>
				</BodyWrapper>
				<FooterWrapper>
					<FooterLink style={{ cursor: 'default', fontWeight: 'bold' }}>
						{comment_count === 1 ? '1 comment' : `${comment_count} comments`}
					</FooterLink>
					<FooterLink onClick={handleCopy}>Share</FooterLink>
					{user &&
						(user.username === username && (
							<FooterLink label='delete' onClick={() => setModalVisable(true)}>
								Delete
							</FooterLink>
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

const NewPostWrapper = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	padding-bottom: 10px;
	.p-button {
		background-color: #dc758f;
		border: #dc758f;

		&:enabled:hover {
			background-color: #ad546b;
			border: #ad546b;
		}
		&:enabled:focus {
			box-shadow: 0 0 0 0.2em #ad546b;
		}
	}

	.p-inputtext:enabled:focus:not(.p-error) {
		border-color: ${props => props.theme.accentPink};
	}

	textarea {
		outline: none;
		border-radius: 3px;
		resize: none;
		font-size: 14px;
		color: #333333;
		background: #ffffff;
		padding: 0.429em;
		border: 1px solid #a6a6a6;
		&:focus {
			border-color: ${props => props.theme.accentPink};
		}
	}
`;

const NewInner = styled.div`
	display: flex;
	border-radius: 4px;
	border: 1px solid;
	border-color: ${props => props.theme.accent};
	flex-direction: column;
	padding: 10px;
	position: relative;
	background-color: ${props => props.theme.secondary};
`;

export const NewPost = ({ newPost, setNewPost, post, setPost, handleSubmit }) => {
	return (
		<NewPostWrapper>
			{newPost ? (
				<NewInner>
					<Button
						style={{ position: 'absolute', top: '5px', right: '5px' }}
						icon='pi pi-times'
						onClick={() => setNewPost(false)}
					/>
					<span className='p-float-label' style={{ margin: '10px 0 ' }}>
						<InputText
							id='in'
							value={post.title}
							onChange={e => setPost({ ...post, title: e.target.value })}
						/>
						<label htmlFor='in'>Title</label>
					</span>
					<textarea
						style={{ marginBottom: '10px' }}
						rows={5}
						value={post.body}
						onChange={e => setPost({ ...post, body: e.target.value })}
					/>
					<Button
						label='Submit'
						disabled={!post.title || !post.body}
						onClick={handleSubmit}
					/>
				</NewInner>
			) : (
				<Button label='Create a New Post' onClick={() => setNewPost(true)} />
			)}
		</NewPostWrapper>
	);
};
