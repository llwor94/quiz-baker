import React, { Fragment } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';

export const PostWrapper = styled.div`
	padding: 0 8px;
	border-radius: 4px;
	border: 1px solid;
	border-color: ${props => props.theme.accent};
	position: relative;
	margin-bottom: 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: ${props => props.theme.secondary};

	&:hover {
		border-color: rgb(129, 131, 132);
	}
`;
const InnerWrapper = styled.div`
	padding-top: 8px;
	margin: 0 8px;
`;

const PostTitle = styled.div`
	font-size: 18px;
	font-weight: 500;
	line-height: 22px;
	cursor: pointer;
	color: ${props => props.theme.text};
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
`;

const FooterWrapper = styled.div`
	display: flex;
	align-items: center;
	font-size: 12px;
	font-weight: 700;
	button {
		width: auto;
		height: 25px;
		white-space: nowrap;
		padding-right: 4px;
		margin-right: 4px;
		text-transform: capitalize;
		overflow-wrap: initial;
		word-break: initial;
		border-radius: 2px;
		transition: background-color 0.1s ease 0s;
		background: transparent;
		border: none;
		color: ${props => props.theme.accentText};
		cursor: pointer;
		padding: initial;
	}
`;

export const Post = ({
	post: { title, author, body, created_at, comment_count },
	handleClick,
	user,
}) => {
	console.log(user.username, author);
	return (
		<PostWrapper>
			<InnerWrapper>
				<Header>
					<span style={{ paddingRight: '3px' }}>
						Posted by {author.username ? author.username : author}
					</span>
					{moment(created_at).fromNow()}
				</Header>
				<PostTitle onClick={handleClick}>{title}</PostTitle>
				<BodyWrapper>
					<p>{body}</p>
				</BodyWrapper>
				<FooterWrapper>
					<button>{comment_count} comments</button>
					<button>Share</button>
					<button>Save</button>
				</FooterWrapper>
			</InnerWrapper>
			{user && (user.username === author && <Button label='delete' onClick={handleClick} />)}
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

export const NewPost = ({
	newPost,
	setNewPost,
	postInput,
	setPostInput,
	postTitle,
	setPostTitle,
	handleSubmit,
}) => {
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
							value={postTitle}
							onChange={e => setPostTitle(e.target.value)}
						/>
						<label htmlFor='in'>Title</label>
					</span>
					<InputTextarea
						style={{ marginBottom: '10px' }}
						rows={5}
						value={postInput}
						onChange={e => setPostInput(e.target.value)}
						autoResize={true}
					/>
					<Button
						label='Submit'
						disabled={!postInput || !postTitle}
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
