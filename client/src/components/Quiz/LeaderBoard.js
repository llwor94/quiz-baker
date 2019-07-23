import React, { useEffect, useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAward } from '@fortawesome/free-solid-svg-icons'

import server from 'server'

import { QuizCtx } from 'pages/Quiz'
import { ProfileIcon } from 'styles/Components/Image'
import { Wrapper, UserWrapper, User } from 'styles/Quiz/LeaderBoard'

const Leaderboard = ({ results }) => {
  const [userScores, setUserScores] = useState([])
  const [quiz, setQuiz] = useContext(QuizCtx)
  useEffect(() => {
    server
      .get(`quizzes/${quiz.id}/scores`)
      .then(({ data }) => {
        setUserScores([...data].filter(quiz => quiz.score).sort((a, b) => b.score - a.score))
      })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    if (results) {
      server
        .get(`quizzes/${quiz.id}/scores`)
        .then(({ data }) => {
          setUserScores([...data].filter(quiz => quiz.score).sort((a, b) => b.score - a.score))
        })
        .catch(err => console.log(err))
    }
  }, [results])

  return (
    <Wrapper>
      Leader Board
      {userScores.length ? (
        userScores.map((userScore, index) => (
          <UserWrapper key={userScore.username}>
            {index === 0 && (userScores[1] && userScore.score > userScores[1].score) ? (
              <div className="firstPlace">
                {' '}
                <User>
                  <ProfileIcon src={userScore.img_url} />
                  <span style={{ marginLeft: '7px' }}>{userScore.username}</span>
                  <FontAwesomeIcon className="award" icon={faAward} />
                </User>
                <div>{userScore.score}</div>
              </div>
            ) : (
              <div className="otherPlaces">
                <User>
                  <ProfileIcon src={userScore.img_url} />
                  <span style={{ marginLeft: '7px' }}>{userScore.username}</span>
                </User>
                <div>{userScore.score}</div>
              </div>
            )}
          </UserWrapper>
        ))
      ) : (
        <p style={{ fontSize: '12px' }}>No users have taken this quiz yet.</p>
      )}
    </Wrapper>
  )
}

export default Leaderboard
