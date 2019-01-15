import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";

import { fetchUserQuizzes, fetchTopics } from "../store/actions/quizActions";
import { checkUser } from "../store/actions/authActions";
import SettingsContainer from "../containers/Settings/index";

const Settings = ({
  user,
  checkUser,
  userQuizzes,
  fetchUserQuizzes,
  topics,
  fetchTopics,
  ...props
}) => {
  useEffect(() => {
    checkUser();
    fetchUserQuizzes();
    fetchTopics();
  }, []);
  if (!user || !userQuizzes || !topics) return <div>Loading...</div>;
  else
    return (
      <div>
        <SettingsContainer {...props} />
      </div>
    );
};

const mapStateToProps = ({ authReducer, quizReducer }) => ({
  user: authReducer.user,
  userQuizzes: quizReducer.userQuizzes,
  loading: quizReducer.loading,
  topics: quizReducer.topics
});

export default connect(
  mapStateToProps,
  { checkUser, fetchUserQuizzes, fetchTopics }
)(Settings);
