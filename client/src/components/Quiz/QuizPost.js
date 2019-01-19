import React, { useEffect } from 'react';

import moment from 'moment';

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

const Post = ({ post }) => {
	return (
		<PostWrapper>
			<InnerWrapper>
				<Header>
					<ProfileIcon src={post.author_img} />
					Posted by <a>{post.author}</a>
					<span style={{ padding: '0 3px' }}>&#8226;</span>
					{moment(post.created_at).fromNow()}
				</Header>
				<BodyWrapper>
					<Title>{post.title}</Title>

					<p>{post.body}</p>
				</BodyWrapper>

				<FooterWrapper>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<CommentCount>
							{post.comment_count === 1 ? (
								'1 comment'
							) : (
								`${post.comment_count} comments`
							)}
						</CommentCount>
					</div>
				</FooterWrapper>
			</InnerWrapper>
		</PostWrapper>
	);
};

export default Post;
