import React, { useEffect } from 'react';

import moment from 'moment';

import { Growl } from 'primereact/growl';
import {
	PostWrapper,
	BodyWrapper,
	Header,
	FooterWrapper,
	CommentCount,
	Title,
	InnerWrapper,
} from '../../Styles/Posts/Post';

const UserPost = ({ post, ...props }) => {
	const growl = React.createRef();
	const handleCopy = () => {
		let value = `http://localhost:3000/forum/${post.id}`;
		navigator.clipboard.writeText(value).then(() => {
			growl.current.show({ severity: 'info', summary: 'Link Copied!' });
		});
	};
	return (
		<PostWrapper userPage>
			<Growl ref={growl} />
			<InnerWrapper>
				<BodyWrapper onClick={() => props.history.push(`/forum/${post.id}`)}>
					<Title>{post.title}</Title>

					<p>{post.body}</p>
				</BodyWrapper>

				<FooterWrapper>
					<CommentCount>
						{post.comment_count === 1 ? '1 comment' : `${post.comment_count} comments`}
					</CommentCount>
					<a onClick={handleCopy}>Share</a>
					<span style={{ padding: '0 3px' }}>&#8226;</span>
					<span>Posted {moment(post.created_at).fromNow()}</span>
				</FooterWrapper>
			</InnerWrapper>
		</PostWrapper>
	);
};

export default UserPost;
