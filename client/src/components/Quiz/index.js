import React, { useEffect, useState, Fragment, useContext } from "react";
import server from "../../utils/server";
import _ from "lodash";
import { Growl } from "primereact/growl";
import { Button } from "../../Styles/Components/Button";
import { QuestionCtx } from "../../containers/Quiz";
import { QuizCtx } from "../../pages/Quiz";

import { SplashWrapper, SplashTitle, SplashHeader } from "../../Styles/Quiz/Splash";
import Question from "./Question";

const Quiz = () => {
  const [quiz, setQuiz] = useContext(QuizCtx);
  const [currentQuestion, setCurrentQuestion] = useContext(QuestionCtx);
  console.log(quiz);
  return (
    <SplashWrapper>
      <div style={{maxWidth: '600px'}}>
        <SplashTitle>{quiz.title}</SplashTitle>
		<SplashHeader>A <span className="topic">{quiz.topic}</span> quiz by <span className="author">{quiz.author.username}</span> </SplashHeader>
		<strong>Description:</strong>
		<div>{quiz.description}</div>
		<div>{quiz.question_count}</div>
		<div>{quiz.score}</div>
		<div>{quiz.time_limit_seconds}</div>
		<div>{quiz.favorite}</div>
		<div>{quiz.votes}</div>
        <Button label="Take Quiz" onClick={() => setCurrentQuestion(0)} full />
      </div>
    </SplashWrapper>
  );
};

export default Quiz;
