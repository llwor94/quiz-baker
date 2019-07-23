import React, { useState, useContext, Fragment } from 'react'
import moment from 'moment'
import { Dialog } from 'primereact/dialog'

import server from 'server'

import { AuthCtx } from 'auth'
import { PostCtx } from 'pages/Post'

import { Growl } from 'styles/Components/Growl'
import { Button, BackButton } from 'styles/Components/Button'
import {
  PostWrapper,
  BodyWrapper,
  Header,
  FooterWrapper,
  CommentCount,
  Title,
  InnerWrapper,
  Topic
} from 'styles/Posts/Post'
import { ProfileIcon } from 'styles/Components/Image'

const Post = props => {
  const [modalVisable, setModalVisable] = useState(false)
  const [post, setPost] = useContext(PostCtx)
  const { user } = useContext(AuthCtx)

  const growl = React.createRef()
  const handleCopy = id => {
    let value = `http://www.quiz-baker.com/forum/${id}`
    navigator.clipboard.writeText(value).then(() => {
      growl.current.show({ severity: 'info', summary: 'Link Copied!' })
    })
  }

  const deletePost = () => {
    server
      .delete(`posts/${post.id}`)
      .then(({ data }) => {
        setModalVisable(false)
        props.history.push(`/forum`)
      })
      .catch(err => console.log(err))
  }

  const footer = (
    <div>
      <Button label="Yes" icon="pi pi-check" onClick={deletePost} className="p-button-danger" />
      <Button
        label="No"
        icon="pi pi-times"
        onClick={() => setModalVisable(false)}
        className="p-button-secondary"
      />
    </div>
  )
  return (
    <Fragment>
      <BackButton
        style={{ position: 'absolute', top: 8, right: 550, width: '35px' }}
        onClick={() => props.history.goBack()}
      />
      <PostWrapper>
        <Growl ref={growl} />
        <InnerWrapper>
          <Header>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <ProfileIcon src={post.author.img_url} />
              <div style={{ marginLeft: '7px' }}>
                Posted by <a href="#author">{post.author.username}</a>
                <span style={{ padding: '0 3px' }}>&#8226;</span>
                {moment(post.created_at).fromNow()}{' '}
              </div>
            </div>
            {post.topic && <Topic>{post.topic}</Topic>}
          </Header>
          <BodyWrapper post>
            <Title>{post.title}</Title>

            <p>{post.body}</p>
          </BodyWrapper>
          <FooterWrapper>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CommentCount>
                {post.comments.length === 1 ? '1 comment' : `${post.comments.length} comments`}
              </CommentCount>
              <i className="pi pi-share-alt" onClick={handleCopy} />
            </div>
            {user &&
              (user.username === post.author.username && (
                <Button white icon="pi pi-trash" onClick={() => setModalVisable(true)} />
              ))}
            <Dialog
              visible={modalVisable}
              style={{ width: '25vw' }}
              footer={footer}
              onHide={() => setModalVisable(false)}
            >
              Are you sure you'd like to delete this post? This action cannot be undone.
            </Dialog>
          </FooterWrapper>
        </InnerWrapper>
      </PostWrapper>
    </Fragment>
  )
}

export default Post
