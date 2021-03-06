import React, { useEffect, useState, useContext } from 'react'
import anime from 'animejs'
import { RadioButton } from 'primereact/radiobutton'

import server from 'server'

import { QuestionCtx } from 'containers/Quiz'
import { QuizCtx, ResponseCtx } from 'pages/Quiz'

import { Button } from 'styles/Components/Button'
import { Wrapper, AnswerWrapper, Answer, Label, QuestionWrapper, Logo } from 'styles/Quiz/Question'
import Timer from 'styles/Components/Timer'

const Question = () => {
  const [quiz, setQuiz] = useContext(QuizCtx)
  const [currentQuestion, setCurrentQuestion] = useContext(QuestionCtx)
  const [questionResponse, setQuestionResponse] = useContext(ResponseCtx)
  const [question, setQuestion] = useState(quiz.questions[0])
  const [selected, setSelected] = useState(null)
  const [checking, setChecking] = useState(false)
  const tl = anime.timeline({
    targets: '.wrapper',
    easing: 'easeOutExpo',
    duration: 500
  })

  useEffect(() => {
    if (currentQuestion) {
      tl.add({
        opacity: 0,
        complete: function(anim) {
          setQuestion(quiz.questions[currentQuestion])
        }
      })
    }
  }, [currentQuestion])

  useEffect(() => {
    tl.add({ opacity: 1 })
  }, [question])

  const handleTimer = () => {
    let newQuestions = [...questionResponse]
    newQuestions[currentQuestion] = {
      correct: false,
      question: question,
      option: 'You did not answer this question in time.'
    }
    setQuestionResponse(newQuestions)
    setCurrentQuestion(currentQuestion + 1)
  }

  const checkAnswer = () => {
    setChecking(true)

    let option = selected + 1
    server
      .get(`quizzes/${quiz.id}/questions/${question.id}/response`, {
        params: { option }
      })
      .then(({ data }) => {
        let newQuestions = [...questionResponse]
        newQuestions[currentQuestion] = {
          correct: data.correct,
          question: question,
          option: question.options[selected]
        }
        setQuestionResponse(newQuestions)
        setCurrentQuestion(currentQuestion + 1)

        setSelected(null)
        setChecking(false)
      })
      .catch(err => console.log(err))
  }

  return (
    <Wrapper>
      <div className="inner">
        <div className="wrapper">
          <QuestionWrapper>{question.question}</QuestionWrapper>

          <AnswerWrapper>
            {question.options &&
              question.options.map((option, i) => (
                <Answer key={i}>
                  <RadioButton
                    inputId={i.toString()}
                    value={i}
                    onChange={e => setSelected(e.value)}
                    checked={selected === i}
                  />
                  <Label htmlFor={i.toString()}>{option}</Label>
                </Answer>
              ))}
            {quiz.question_time_limit && (
              <Timer
                startCount={quiz.question_time_limit}
                handleTimer={handleTimer}
                question={question}
                reset={checking}
              />
            )}
          </AnswerWrapper>
        </div>
        <Logo>
          <span className="Q">Q</span>
          <span className="B">B</span>
        </Logo>
      </div>

      <Button
        onClick={checkAnswer}
        label="Submit"
        disabled={selected === null}
        full
        style={{ margin: '20px 0 10px' }}
      />
    </Wrapper>
  )
}

export default Question
