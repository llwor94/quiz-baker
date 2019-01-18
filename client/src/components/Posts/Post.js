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
import { ProfileIcon } from '../../Styles/Components/Image';

const Post = ({ post, ...props }) => {
	const growl = React.createRef();
	const handleCopy = id => {
		let value = `http://localhost:3000/forum/${id}`;
		navigator.clipboard.writeText(value).then(() => {
			growl.current.show({ severity: 'info', summary: 'Link Copied!' });
		});
	};
	console.log(props.history.location.pathname === '/user/settings');
	return (
		<PostWrapper style={{ width: '450px', margin: '8px' }}>
			<Growl ref={growl} />
			<InnerWrapper>
				<Header>
					<ProfileIcon src={post.author_img} />
					Posted by <a>{post.author}</a>
					<span style={{ padding: '0 3px' }}>&#8226;</span>
					{moment(post.created_at).fromNow()}
				</Header>
				<BodyWrapper onClick={() => props.history.push(`/forum/${post.id}`)}>
					<Title>{post.title}</Title>

					<p>{post.body}</p>
				</BodyWrapper>

				<FooterWrapper>
					<CommentCount>
						{post.comment_count === 1 ? '1 comment' : `${post.comment_count} comments`}
					</CommentCount>
					<a onClick={handleCopy}>Share</a>
				</FooterWrapper>
			</InnerWrapper>
		</PostWrapper>
	);
};

export default Post;
