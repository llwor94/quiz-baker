import React, { useEffect, useContext } from 'react'

import server from 'server'

import { PostCtx } from 'pages/Post'

import Loading from 'components/Loading'
import Post from 'components/Post'
import NewComment from 'components/Post/NewComment'
import Comments from 'components/Post/Comments'

import { PostWrapper } from 'styles/Posts'

const PostContainer = props => {
  const [post, setPost] = useContext(PostCtx)

  useEffect(() => {
    server.get(`/posts/${props.match.params.id}`).then(({ data }) => {
      setPost(data)
    })
  }, [])

  if (!post) return <Loading />
  else
    return (
      <PostWrapper>
        <Post {...props} />
        <NewComment />
        {post.comments.length > 0 && <Comments />}
      </PostWrapper>
    )
}

export default PostContainer
