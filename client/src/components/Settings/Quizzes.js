import React, { useContext } from 'react'

import { UserQuizzesCtx } from 'pages/Settings'

import CreateQuiz from './CreateQuiz'
import UserQuiz from './UserQuiz'

import { Wrapper, InnerWrapper } from 'styles/Settings'

const Quizzes = props => {
  const [userQuizzes, setUserQuizzes] = useContext(UserQuizzesCtx)
  return (
    <InnerWrapper>
      <CreateQuiz fromSettings />
      <Wrapper>
        {userQuizzes.map(quiz => (
          <UserQuiz key={quiz.id} quiz={quiz} {...props} />
        ))}
      </Wrapper>
    </InnerWrapper>
  )
}

export default Quizzes
