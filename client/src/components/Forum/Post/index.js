import React, { useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import Button from '../../Styles/Button';

import { Dialog } from 'primereact/dialog';

import { PostWrapper } from '../../Styles/Wrappers/index';
import { FooterWrapper, FooterLink } from '../../Styles/Wrappers/footer';
import { Title } from '../../Styles/Text/title';

import { ProfileIcon } from '../../Styles/Image';

export const InnerWrapper = styled.div`
	padding: 8px 0;
	margin: 0 8px;
`;

export const BodyWrapper = styled.div`
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
export const Header = styled.div`
	font-size: 12px;
	font-weight: 400;
	line-height: 16px;
	display: flex;
	align-items: center;
	margin-bottom: 8px;
	color: ${props => props.theme.link};
`;

export const UserNameWrapper = styled.div`
	display: flex;
	align-items: center;
	a {
		color: ${props => props.theme.accentRed};
		padding-left: 3px;
	}
`;

const UserName = styled.a`
	font-size: 12px;
	font-weight: 400;
	line-height: 16px;
	color: ${props => props.theme.accentRed};
	padding-left: 3px;
`;

const CommentCount = styled(FooterLink)`
	color: ${props => props.theme.aqua}
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
	let img = post.author.hasOwnProperty('img_url') ? post.author.img_url : post.author_img;
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
						<ProfileIcon src={img} />
						Posted by <UserName>{username}</UserName>
					</UserNameWrapper>
					<span style={{ padding: '0 3px' }}>&#8226;</span>
					{moment(post.created_at).fromNow()}
				</Header>
				<div onClick={handleClick} style={{ cursor: 'pointer' }}>
					<Title>{post.title}</Title>
					<BodyWrapper>
						<p>{post.body}</p>
					</BodyWrapper>
				</div>
				<FooterWrapper>
					<CommentCount style={{ cursor: 'default', fontWeight: 'bold' }}>
						{comment_count === 1 ? '1 comment' : `${comment_count} comments`}
					</CommentCount>
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
