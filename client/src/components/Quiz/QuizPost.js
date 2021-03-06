import React, { useState, useContext } from 'react'
import moment from 'moment'
import anime from 'animejs'

import server from 'server'

import { AuthCtx } from 'auth'
import { QuizPostCtx } from 'containers/Quiz'

import PostComments from './PostComments'

import {
  PostWrapper,
  BodyWrapper,
  Header,
  FooterWrapper,
  CommentCount,
  Title,
  InnerWrapper,
  LeftSide
} from 'styles/Posts/Post'
import { ProfileIcon } from 'styles/Components/Image'

const Post = ({ post }) => {
  const [showingComments, setShowingComments] = useState(false)
  const { user } = useContext(AuthCtx)
  const [quizPosts, setQuizPosts] = useContext(QuizPostCtx)

  const handleComments = () => {
    if (showingComments) {
      anime({
        targets: '.comment',
        opacity: 0,
        translateY: -60,
        delay: anime.stagger(10, { easing: 'easeOutQuad' }),
        update: () => {
          setShowingComments(false)
        }
      })
    } else {
      setShowingComments(true)
    }
  }

  const handleVote = val => {
    if (user) {
      let user_vote
      if (val === post.user_vote) {
        user_vote = 0
      } else {
        user_vote = val
      }
      server
        .patch(`posts/${post.id}/vote`, { vote: user_vote })
        .then(({ data }) => {
          server.get(`/quizzes/${post.quiz}/posts`).then(({ data }) => {
            setQuizPosts(data.sort((a, b) => b.id - a.id))
          })
        })
        .catch(err => console.log(err))
    }
  }
  return (
    <div>
      <PostWrapper>
        <InnerWrapper>
          <Header>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <ProfileIcon src={post.author_img} />
              <div style={{ marginLeft: '7px' }}>
                Posted by <a href="#author">{post.author}</a>
                <span style={{ padding: '0 3px' }}>&#8226;</span>
                {moment(post.created_at).fromNow()}
              </div>
            </div>
          </Header>
          <div className="body">
            <LeftSide user={user} quiz>
              <i
                className="pi pi-chevron-up"
                style={{
                  color: post.user_vote === 1 && '#DC758F'
                }}
                onClick={() => handleVote(1)}
              />
              <p
                style={{
                  color: post.user_vote === 1 ? '#DC758F' : post.user_vote === -1 && '#E3D3E4'
                }}
              >
                {post.votes}
              </p>
              <i
                className="pi pi-chevron-down"
                style={{
                  color: post.user_vote === -1 && '#E3D3E4'
                }}
                onClick={() => handleVote(-1)}
              />
            </LeftSide>
            <div style={{ flexGrow: 1 }}>
              <BodyWrapper quiz>
                <Title>{post.title}</Title>

                <p>{post.body}</p>
              </BodyWrapper>

              <FooterWrapper>
                <CommentCount style={{ cursor: 'pointer' }} onClick={handleComments}>
                  {post.comment_count === 1 ? '1 comment' : `${post.comment_count} comments`}
                </CommentCount>
                <i
                  className={showingComments ? 'pi pi-angle-down' : 'pi pi-angle-left'}
                  onClick={handleComments}
                />
              </FooterWrapper>
            </div>
          </div>
        </InnerWrapper>
      </PostWrapper>
      {showingComments && <PostComments post={post} />}
    </div>
  )
}

export default Post
