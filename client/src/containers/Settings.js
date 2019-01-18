import React, { useEffect, useState, useContext } from "react";
import UserQuiz from "../components/Settings/UserQuiz";
import Quiz from "../components/Quizzes/Quiz";
import CreateQuiz from "../components/Settings/CreateQuiz";
import Sidebar from "../components/Settings/Sidebar";
import Loading from "../components/Styles/Loading";
import { UserQuizzesCtx, UserPostsCtx } from "../pages/Settings";
import { UserCtx } from "../App";
import NewPost from "../components/Posts/NewPost";
import Post from "../components/Posts/Post";

import { SettingsWrapper } from "../Styles/Settings/";

import server from "../utils/server";
const Settings = props => {
  const [userQuizzes, setUserQuizzes] = useContext(UserQuizzesCtx);
  const [userPosts, setUserPosts] = useContext(UserPostsCtx);
  const [user, setUser] = useContext(UserCtx);
  useEffect(
    () => {
      server.get("/quizzes").then(({ data }) => {
        if (user) {
          setUserQuizzes(
            data
              .filter(quiz => quiz.author === user.username)
              .sort((a, b) => b.id - a.id)
          );
        }
      });
      server.get("/posts").then(({ data }) => {
        if (user) {
          setUserPosts(
            data
              .filter(post => post.author === user.username)
              .sort((a, b) => b.id - a.id)
          );
        }
      });
    },
    [user]
  );

  console.log(userQuizzes);

  if (!userQuizzes || !userPosts) return <Loading />;
  else
    return (
      <SettingsWrapper>
        <Sidebar />
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: "15px" }}>
          <div style={{display: 'flex'}}>

          <h2>Your Quizzes</h2>
            <CreateQuiz fromSettings/>
          </div>
            {userQuizzes.map(quiz => (
              <Quiz key={quiz.id} quiz={quiz} {...props} />
            ))}
          </div>
          <div>
              <h2>Your Posts</h2>
            <NewPost />
            {userPosts.map(post => (
              <Post key={post.id} post={post} {...props} />
            ))}
          </div>
        </div>
      </SettingsWrapper>
    );
};

export default Settings;
