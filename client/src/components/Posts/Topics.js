import React, { useEffect, useState, useContext } from 'react'
import { MultiSelect } from 'primereact/multiselect'

import server from 'server'

import { PostsCtx } from 'pages/Forum'

import { Topic, MultiSelectWrapper } from 'styles/Quizzes/Quiz'

const Topics = () => {
  const [topics, setTopics] = useState([])
  const [selected, setSelected] = useState([])
  const [posts, setPosts] = useContext(PostsCtx)
  const [allPosts, setAllPosts] = useState(posts)

  useEffect(() => {
    server.get('/quizzes/topics').then(({ data }) => {
      let topics = data.filter(topic => posts.some(post => post.topic === topic.name))
      setTopics(topics)
      setSelected(topics)
    })
  }, [])

  useEffect(() => {
    if (selected.length) {
      setPosts(allPosts.filter(post => selected.some(topic => topic.name === post.topic)))
    } else setPosts(allPosts)
  }, [selected])

  const selectedTemplate = value => {
    if (value) {
      return <Topic style={{ margin: '0 2px' }}>{value.name}</Topic>
    } else return <div>Filter by Topic</div>
  }

  return (
    <MultiSelectWrapper>
      <MultiSelect
        optionLabel="name"
        value={selected}
        options={topics}
        onChange={e => setSelected(e.value)}
        filter={true}
        selectedItemTemplate={selectedTemplate}
      />
    </MultiSelectWrapper>
  )
}

export default Topics
