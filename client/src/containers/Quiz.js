import React, { useEffect, useState, useContext, createContext } from 'react'
import _ from 'lodash'

import server from 'server'

import { QuizCtx, ResponseCtx } from 'pages/Quiz'

import Loading from 'components/Loading'
import Quiz from 'components/Quiz'
import Question from 'components/Quiz/Question'
import QuestionTracker from 'components/Quiz/QuestionTracker'
import Results from 'components/Quiz/Results'
import LeaderBoard from 'components/Quiz/LeaderBoard'
import QuizPosts from 'components/Quiz/QuizPosts'

import { Wrapper } from 'styles/Quiz'

export const QuestionCtx = createContext([undefined, () => {}])
export const QuizPostCtx = createContext([undefined, () => {}])

const QuizContainer = props => {
  const [quiz, setQuiz] = useContext(QuizCtx)

  const [questionResponse, setQuestionReponse] = useContext(ResponseCtx)
  const [currentQuestion, setCurrentQuestion] = useState(undefined)
  const [quizPosts, setQuizPosts] = useState(undefined)
  const [newComment, setNewComment] = useState(false)

  useEffect(() => {
    server.get(`/quizzes/${props.match.params.id}`).then(({ data }) => {
      let retrievedQuiz = data
      server.get(`/quizzes/${props.match.params.id}/questions`).then(({ data }) => {
        retrievedQuiz.questions = data
        setQuestionReponse(_.fill(Array(data.length), { correct: null }))
        setQuiz(retrievedQuiz)
      })
    })
  }, [])

  if (!quiz) return <Loading />
  else
    return (
      <QuestionCtx.Provider value={[currentQuestion, setCurrentQuestion]}>
        <Wrapper>
          <LeaderBoard results={currentQuestion === quiz.question_count} />
          {currentQuestion === undefined ? (
            <Quiz {...props} />
          ) : currentQuestion === quiz.question_count ? (
            <Results setNewComment={setNewComment} />
          ) : (
            <Question />
          )}
          {currentQuestion !== quiz.question_count && <QuestionTracker />}
          <QuizPostCtx.Provider value={[quizPosts, setQuizPosts]}>
            <QuizPosts quiz={quiz} setNewComment={setNewComment} newComment={newComment} />
          </QuizPostCtx.Provider>
        </Wrapper>
      </QuestionCtx.Provider>
    )
}

export default QuizContainer
