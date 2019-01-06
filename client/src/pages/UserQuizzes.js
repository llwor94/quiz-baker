import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import { fetchUserQuizzes, fetchTopics } from '../store/actions/quizActions';
import QuizzesContainer from '../containers/UserQuizzes/Quizzes';
import CreateQuizContainer from '../containers/UserQuizzes/CreateQuiz';

const UserQuizzesPage = ({ userQuizzes, fetchUserQuizzes, topics, fetchTopics, ...props }) => {
	useEffect(() => {
		fetchUserQuizzes();
		fetchTopics();
	}, []);

	if (!userQuizzes || !topics) return <div>Loading...</div>;
	else
		return (
			<Fragment>
				<CreateQuizContainer />
				<QuizzesContainer {...props} />
			</Fragment>
		);
};

const mapStateToProps = ({ quizReducer }) => ({
	userQuizzes: quizReducer.userQuizzes,
	loading: quizReducer.loading,
	topics: quizReducer.topics,
});

export default connect(mapStateToProps, { fetchUserQuizzes, fetchTopics })(UserQuizzesPage);
