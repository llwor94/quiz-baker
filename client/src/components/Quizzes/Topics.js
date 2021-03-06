import React, { useEffect, useState, useContext } from 'react'
import { MultiSelect } from 'primereact/multiselect'

import server from 'server'

import { QuizzesCtx } from 'pages/Quizzes'

import { Topic, MultiSelectWrapper } from 'styles/Quizzes/Quiz'

const Topics = () => {
  const [topics, setTopics] = useState([])
  const [selected, setSelected] = useState([])
  const [quizzes, setQuizzes] = useContext(QuizzesCtx)
  const [allQuizzes, setAllQuizzes] = useState(quizzes)

  useEffect(() => {
    server.get('/quizzes/topics').then(({ data }) => {
      setTopics(data.filter(topic => quizzes.some(quiz => quiz.topic === topic.name)))
    })
  }, [])

  useEffect(() => {
    if (selected.length) {
      setQuizzes(allQuizzes.filter(quiz => selected.some(topic => topic.name === quiz.topic)))
    } else {
      setQuizzes(allQuizzes)
    }
  }, [selected])

  const selectedTemplate = value => {
    if (value) {
      return <Topic style={{ margin: '0 2px' }}>{value.name}</Topic>
    } else return <div>Topics</div>
  }

  return (
    <MultiSelectWrapper>
      <MultiSelect
        className="topics"
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
