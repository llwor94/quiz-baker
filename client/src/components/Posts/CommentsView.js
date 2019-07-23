import React, { useState, useEffect, useContext } from 'react'
import anime from 'animejs'
import server from 'server'

import { AuthCtx } from 'auth'

import Comment from '../Post/Comment'
import Loading from '../Loading'

import { ProfileIcon } from 'styles/Components/Image'
import { PostComment } from 'styles/Comments/Comment'
import { CommentsWrapper, InnerWrapper } from 'styles/Posts'
import { EmojiInput } from 'styles/Components/Input'

import darkModeLogo from 'assets/logo-darkmode.png'

const Comments = ({ currentPost }) => {
  const [comments, setComments] = useState(undefined)
  const [showing, setShowing] = useState(false)
  const { user } = useContext(AuthCtx)
  const [commentInput, setCommentInput] = useState('')
  useEffect(() => {
    if (currentPost) {
      setShowing(true)
      server.get(`/posts/${currentPost}/comments`).then(({ data }) => {
        setComments(data.sort((a, b) => b.id - a.id))
      })
    } else {
      setShowing(false)
      setComments(undefined)
    }
  }, [currentPost])

  useEffect(() => {
    if (comments) {
      anime({
        targets: '.comment',
        translateY: 0,
        opacity: 1,
        delay: anime.stagger(20, { easing: 'easeOutQuad' })
      })
    }
  }, [comments])

  const addComment = () => {
    server
      .post(`posts/${currentPost}/comments`, { text: commentInput })
      .then(({ data }) => {
        setCommentInput('')
        server.get(`/posts/${currentPost}/comments`).then(({ data }) => {
          setComments(data.sort((a, b) => b.id - a.id))
        })
      })
      .catch(error => console.log(error))
  }

  const deleteComment = id => {
    server
      .delete(`posts/${currentPost}/comments/${id}`)
      .then(({ data }) => {
        server.get(`/posts/${currentPost}/comments`).then(({ data }) => {
          setComments(data.sort((a, b) => b.id - a.id))
        })
      })
      .catch(error => console.log(error))
  }
  if (!showing)
    return (
      <CommentsWrapper>
        <div className="image">
          <img className="quizBaker" src={darkModeLogo} alt="" />
        </div>
      </CommentsWrapper>
    )
  else
    return (
      <CommentsWrapper>
        <InnerWrapper comments={comments}>
          <div className="inner">
            <PostComment>
              <ProfileIcon src={user.img_url} />

              <EmojiInput
                user={user}
                placeholder="Post a comment"
                value={commentInput}
                onChange={e => setCommentInput(e.target.value)}
                handleSelect={e => setCommentInput(commentInput + e.native)}
                onKeyUp={e => {
                  if (e.keyCode === 13) {
                    addComment()
                  }
                }}
                style={{ flexGrow: 1 }}
              />
            </PostComment>
            <div className="comments-wrapper">
              {comments ? (
                comments.map(comment => (
                  <Comment key={comment.id} comment={comment} deleteComment={deleteComment} />
                ))
              ) : (
                <Loading />
              )}
            </div>
          </div>
        </InnerWrapper>
      </CommentsWrapper>
    )
}

export default Comments
