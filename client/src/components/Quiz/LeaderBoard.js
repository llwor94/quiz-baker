import React, { useEffect, useState, useContext } from "react";
import server from "../../utils/server";
import { QuizCtx } from "../../pages/Quiz";
import { ProfileIcon } from "../../Styles/Components/Image";
import { Wrapper, UserWrapper, User } from "../../Styles/Quiz/LeaderBoard";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAward} from '@fortawesome/free-solid-svg-icons'

const Leaderboard = () => {
  const [userScores, setUserScores] = useState([]);
  const [quiz, setQuiz] = useContext(QuizCtx);
  useEffect(() => {
    server
      .get(`quizzes/${quiz.id}/scores`)
      .then(({ data }) => {
        setUserScores(
          [...data].filter(quiz => quiz.score).sort((a, b) => b.score - a.score)
        );
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <Wrapper>
      Leader Board
      {userScores.length ? (
        userScores.map((userScore, index) => (
          <UserWrapper key={userScore.username}>
            {index === 0 ? (
              <div className="firstPlace">
                {" "}
                <User>
                  <ProfileIcon src={userScore.img_url} />
                  <span>{userScore.username}</span>
				  <FontAwesomeIcon className="award" icon={faAward}></FontAwesomeIcon>
                </User>
                <div>{userScore.score}</div>
              </div>
            ) : (
              <div className="otherPlaces">
                <User>
                  <ProfileIcon src={userScore.img_url} />
                  <span>{userScore.username}</span>
                </User>
                <div>{userScore.score}</div>
              </div>
            )}
          </UserWrapper>
        ))
      ) : (
        <p style={{ fontSize: "12px" }}>No users have taken this quiz yet.</p>
      )}
    </Wrapper>
  );
};

export default Leaderboard;
