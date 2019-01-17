import React, { useEffect, useState, Fragment, useContext } from "react";
import server from "../../utils/server";
import _ from "lodash";
import { Growl } from "primereact/growl";
import { Button } from "../../Styles/Components/Button";
import { QuestionCtx } from "../../containers/Quiz";
import { QuizCtx } from "../../pages/Quiz";

import { SplashWrapper, SplashTitle } from "../../Styles/Quiz/Splash";

const Quiz = () => {
  const [quiz, setQuiz] = useContext(QuizCtx);
  const [currentQuestion, setCurrentQuestion] = useContext(QuestionCtx);

  return (
    <SplashWrapper>
      <div>
        <SplashTitle>{quiz.title}</SplashTitle>
        <Button label="Take Quiz" onClick={() => setCurrentQuestion(0)} full />
      </div>
    </SplashWrapper>
  );
};

export default Quiz;
