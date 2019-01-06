import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { fetchUserQuizzes, deleteQuiz } from '../../store/actions/quizActions';
import { Quiz } from '../../components/Quizzes/Quiz/userQuiz';

const Quizzes = ({ quizzes, fetchUserQuizzes, deleteQuiz, ...props }) => {
	return quizzes.map(quiz => (
		<Quiz
			key={quiz.id}
			quiz={quiz}
			handleDelete={() => deleteQuiz(quiz.id)}
			handleClick={() => props.history.push(`/quizzes/edit/${quiz.id}`)}
		/>
	));
};

const mapStateToProps = ({ quizReducer }) => ({
	quizzes: quizReducer.userQuizzes,
	loading: quizReducer.loading,
});

export default connect(mapStateToProps, { fetchUserQuizzes, deleteQuiz })(Quizzes);
