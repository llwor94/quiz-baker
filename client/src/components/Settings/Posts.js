import React, { useEffect, useState, useContext, Fragment } from 'react';
import NewPost from '../Posts/NewPost';
import Post from '../Posts/Post';
import { Wrapper, InnerWrapper } from '../../Styles/Settings';

import { UserPostsCtx } from '../../pages/Settings';
import UserPost from './UserPost';

const Posts = props => {
	const [ userPosts, setUserPosts ] = useContext(UserPostsCtx);

	return (
		<InnerWrapper>
			<NewPost userPage={true} />
			<Wrapper>
				{userPosts.map(post => <UserPost key={post.id} post={post} {...props} />)}
			</Wrapper>
		</InnerWrapper>
	);
};

export default Posts;
