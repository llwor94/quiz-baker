import React, { useContext } from 'react'

import { UserPostsCtx } from 'pages/Settings'

import CreatePost from './CreatePost'
import UserPost from './UserPost'

import { Wrapper, InnerWrapper } from 'styles/Settings'

const Posts = props => {
  const [userPosts, setUserPosts] = useContext(UserPostsCtx)

  return (
    <InnerWrapper>
      <CreatePost />
      <Wrapper>
        {userPosts.map(post => (
          <UserPost key={post.id} post={post} {...props} />
        ))}
      </Wrapper>
    </InnerWrapper>
  )
}

export default Posts
