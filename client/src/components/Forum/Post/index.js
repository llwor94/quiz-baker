import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import blankProfile from '../../../assets/blank-profile.png';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';

import { PostWrapper } from '../../Styles/Wrappers/index';
import { FooterWrapper } from '../../Styles/Wrappers/footer';
import { Title } from '../../Styles/Text/title';

const InnerWrapper = styled.div`
	padding-top: 8px;
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
	margin-bottom: 8px;
	color: ${props => props.theme.link};
	img {
		height: 20px;
		width: 20px;
		border-radius: 50%;
	}
`;

export const Post = ({
	post: { title, author, body, created_at, comment_count },
	handleClick,
	handleDelete,
	setModalVisable,
	modalVisable,
	user,
}) => {
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
					<span style={{ paddingRight: '3px' }}>
						<img src={user.img_url ? user.img_url : blankProfile} />
						Posted by {author.username ? author.username : author}
					</span>
					{moment(created_at).fromNow()}
				</Header>
				<Title onClick={handleClick}>{title}</Title>
				<BodyWrapper>
					<p>{body}</p>
				</BodyWrapper>
				<FooterWrapper>
					<button style={{ cursor: 'default', fontWeight: 'bold' }}>
						{comment_count} comments
					</button>
					<button>Share</button>
					{user &&
						(user.username === author && (
							<button label='delete' onClick={() => setModalVisable(true)}>
								Delete
							</button>
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
						className='p-button-secondary'
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
						className='p-button-secondary'
						onClick={handleSubmit}
					/>
				</NewInner>
			) : (
				<Button label='Create a New Post' onClick={() => setNewPost(true)} />
			)}
		</NewPostWrapper>
	);
};
