import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Quiz } from '../components/Quizzes/Quiz/userQuiz';
import { fetchUserQuizzes, deleteQuiz } from '../store/actions/quizActions';

const UserQuizzes = ({ ...props }) => {
	useEffect(() => {
		props.fetchUserQuizzes();
	}, []);

	if (props.userQuizzes)
		return props.userQuizzes.map(quiz => (
			<Quiz
				key={quiz.id}
				quiz={quiz}
				handleDelete={() => props.deleteQuiz(quiz.id)}
				handleClick={() => props.history.push(`/quizzes/edit/${quiz.id}`)}
			/>
		));
	else return <div>Loading..</div>;
};

const mapStateToProps = ({ quizReducer }) => ({
	userQuizzes: quizReducer.userQuizzes,
	loading: quizReducer.loading,
});

export default connect(mapStateToProps, { fetchUserQuizzes, deleteQuiz })(UserQuizzes);
