import React, { useState, createContext } from 'react'

import PostContainer from 'containers/Post'

export const PostCtx = createContext([undefined, () => {}])

const PostPage = props => {
  const [post, setPost] = useState(undefined)

  return (
    <PostCtx.Provider value={[post, setPost]}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <PostContainer {...props} />
      </div>
    </PostCtx.Provider>
  )
}

export default PostPage
