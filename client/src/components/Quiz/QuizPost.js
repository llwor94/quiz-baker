import React, { useState, useEffect } from 'react';

import moment from 'moment';

import {
	PostWrapper,
	BodyWrapper,
	Header,
	FooterWrapper,
	CommentCount,
	Title,
	InnerWrapper,
	CommentWrapper,
} from '../../Styles/Posts/Post';
import { ProfileIcon } from '../../Styles/Components/Image';
import PostComments from './PostComments';

const Post = ({ post }) => {
	const [ showingComments, setShowingComments ] = useState(false);

	console.log(post);
	return (
		<div>
			<PostWrapper>
				<InnerWrapper>
					<Header>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<ProfileIcon src={post.author_img} />
							Posted by <a>{post.author}</a>
							<span style={{ padding: '0 3px' }}>&#8226;</span>
							{moment(post.created_at).fromNow()}
						</div>
					</Header>
					<BodyWrapper quiz>
						<Title>{post.title}</Title>

						<p>{post.body}</p>
					</BodyWrapper>

					<FooterWrapper>
						<CommentCount
							style={{ cursor: 'pointer' }}
							onClick={() => setShowingComments(!showingComments)}
						>
							{post.comment_count === 1 ? (
								'1 comment'
							) : (
								`${post.comment_count} comments`
							)}
						</CommentCount>
						<i
							className={showingComments ? 'pi pi-angle-down' : 'pi pi-angle-left'}
							onClick={() => setShowingComments(!showingComments)}
						/>
					</FooterWrapper>
				</InnerWrapper>
			</PostWrapper>
			{showingComments && <PostComments post={post} />}
		</div>
	);
};

export default Post;
