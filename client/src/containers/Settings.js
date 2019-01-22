import React, { useEffect, useState, useContext } from "react";
import Profile from "../components/Settings/Profile";
import Loading from "../components/Styles/Loading";
import { UserQuizzesCtx, UserPostsCtx } from "../pages/Settings";
import { UserCtx } from "../App";

import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import Quizzes from "../components/Settings/Quizzes";
import Posts from "../components/Settings/Posts";
import { SettingsWrapper, Menu, NewMenu } from "../Styles/Settings/";
import server from "../utils/server";

const Settings = props => {
  const [userQuizzes, setUserQuizzes] = useContext(UserQuizzesCtx);
  const [userPosts, setUserPosts] = useContext(UserPostsCtx);
  const [user, setUser] = useContext(UserCtx);
  const [activeTab, setActiveTab] = useState("quizzes");

  const [sidebarShowing, setSidebarShowing] = useState(false);

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
  const tabs = [
    { label: "Your Quizzes", command: () => setActiveTab("quizzes") },
    { label: "Your Posts", command: () => setActiveTab("posts") }
  ];

  if (!userQuizzes || !userPosts) return <Loading />;
  else
    return (
      <SettingsWrapper>
        <div style={{ marginRight: "15px" }}>
          <Button
            icon="pi pi-arrow-right"
            onClick={() => setSidebarShowing(true)}
          />
          <Sidebar
            visible={sidebarShowing}
            onHide={() => setSidebarShowing(false)}
          >
            <Profile />
          </Sidebar>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              position: "relative"
            }}
          >
            {/* <Menu model={tabs} activeTab={activeTab} /> */}
            <NewMenu activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          {activeTab === "quizzes" ? (
            <Quizzes {...props} />
          ) : (
            <div>
              <Posts {...props} />
            </div>
          )}
          ;
        </div>
      </SettingsWrapper>
    );
};

export default Settings;
