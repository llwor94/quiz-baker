import React, { useState, useContext, useEffect } from 'react'
import _ from 'lodash'
import { ToggleButton } from 'primereact/togglebutton'

import server from 'server'

import { UserQuizCtx, QuizQuestionsCtx } from 'pages/UserQuiz'

import { MultipleChoice, TrueFalse } from './InputOptions'

import { EditWrapper, InputTitleWrapper } from 'styles/UserQuiz/Questions'
import { Button } from 'styles/Components/Button'
import { AddQuestionTextArea } from 'styles/Components/Input'

const CreateQuestion = () => {
  const [quiz, setQuiz] = useContext(UserQuizCtx)
  const [questions, setQuestions] = useContext(QuizQuestionsCtx)
  const [multipleChoice, setMultipleChoice] = useState(true)
  const [questionTitle, setQuestionTitle] = useState(undefined)
  const [newQuestion, setNewQuestion] = useState(false)

  const [options, setOptions] = useState({
    option1: '',
    option2: '',
    option3: '',
    option4: ''
  })
  const [correctOption, setCorrect] = useState(null)

  useEffect(() => {
    if (multipleChoice) {
      setOptions({
        option1: '',
        option2: '',
        option3: '',
        option4: ''
      })
      setCorrect(null)
    } else {
      setOptions({ option1: 'True', option2: 'False' })
      setCorrect(null)
    }
  }, [multipleChoice])

  const handleOptionChange = e => {
    setOptions({ ...options, [e.target.name]: e.target.value })
  }

  const handleCreateQuestion = () => {
    options.question = questionTitle
    options.answer = correctOption
    server
      .post(`quizzes/${quiz.id}/questions`, options)
      .then(({ data }) => {
        server.get(`quizzes/${quiz.id}/questions`).then(({ data }) => {
          setQuestions(data)
          setNewQuestion(false)
        })
      })
      .catch(err => console.log(err))
  }

  if (newQuestion)
    return (
      <EditWrapper>
        <Button
          style={{ position: 'absolute', top: '3px', right: '3px' }}
          icon="pi pi-times"
          onClick={() => setNewQuestion(false)}
        />
        <ToggleButton
          style={{ width: '150px', marginTop: '5px' }}
          onLabel="Multiple Choice"
          offLabel="True/False"
          checked={multipleChoice}
          onChange={e => setMultipleChoice(e.value)}
        />
        <InputTitleWrapper>
          <AddQuestionTextArea
            value={questionTitle}
            onChange={e => setQuestionTitle(e.target.value)}
            label="Question Title"
          />
        </InputTitleWrapper>

        {multipleChoice ? (
          <MultipleChoice
            correctOption={correctOption}
            handleCorrectChange={e => setCorrect(e.value)}
            options={options}
            handleOptionChange={handleOptionChange}
          />
        ) : (
          <TrueFalse handleCorrectChange={e => setCorrect(e.value)} correctOption={correctOption} />
        )}
        <Button
          label="Create Question"
          disabled={_.some(options, _.isEmpty) || correctOption === null || !questionTitle}
          onClick={handleCreateQuestion}
        />
      </EditWrapper>
    )
  else
    return (
      <a href="#new">
        <Button
          label="New Question"
          onClick={() => {
            setNewQuestion(true)
          }}
          full
        />
      </a>
    )
}

export default CreateQuestion
