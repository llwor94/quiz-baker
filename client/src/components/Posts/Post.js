import React, { useEffect } from 'react';

import moment from 'moment';

import { Growl } from 'primereact/growl';

import {
	PostWrapper,
	BodyWrapper,
	Header,
	UserNameWrapper,
	FooterWrapper,
	FooterLink,
	CommentCount,
	Title,
	InnerWrapper,
} from '../../Styles/Posts/Post';
import { ProfileIcon } from '../../Styles/Components/Image';

const Post = ({ post, ...props }) => {
	console.log(post);
	const growl = React.createRef();
	const handleCopy = id => {
		let value = `http://localhost:3000/forum/${id}`;
		navigator.clipboard.writeText(value).then(() => {
			growl.current.show({ severity: 'info', summary: 'Link Copied!' });
		});
	};

	return (
		<PostWrapper>
			<Growl ref={growl} />
			<InnerWrapper>
				<Header>
					<UserNameWrapper>
						<ProfileIcon src={post.author_img} />
						Posted by <a>{post.author}</a>
						<span style={{ padding: '0 3px' }}>&#8226;</span>
						{moment(post.created_at).fromNow()}
					</UserNameWrapper>
				</Header>
				<div
					onClick={() => props.history.push(`forum/${post.id}`)}
					style={{ cursor: 'pointer' }}
				>
					<Title>{post.title}</Title>
					<BodyWrapper>
						<p>{post.body}</p>
					</BodyWrapper>
				</div>
				<FooterWrapper>
					<CommentCount>
						{post.comment_count === 1 ? '1 comment' : `${post.comment_count} comments`}
					</CommentCount>
					<FooterLink onClick={handleCopy}>Share</FooterLink>
				</FooterWrapper>
			</InnerWrapper>
		</PostWrapper>
	);
};

export default Post;
