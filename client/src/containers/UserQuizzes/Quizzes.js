import React from 'react';
import { connect } from 'react-redux';

import server from '../../utils/server';

import { fetchUserQuizzes } from '../../store/actions/quizActions';
import { Quiz } from '../../components/Quizzes/Quiz/userQuiz';

const Quizzes = ({ quizzes, fetchUserQuizzes, token, ...props }) => {
	const deleteQuiz = id => {
		server
			.delete(`quizzes/${id}`)
			.then(response => {
				fetchUserQuizzes();
			})
			.catch(error => console.log(error));
	};
	return quizzes.map(quiz => (
		<Quiz
			key={quiz.id}
			quiz={quiz}
			handleDelete={() => deleteQuiz(quiz.id)}
			handleClick={() => props.history.push(`/quizzes/edit/${quiz.id}`)}
		/>
	));
};

const mapStateToProps = ({ quizReducer, authReducer }) => ({
	quizzes: quizReducer.userQuizzes,
	loading: quizReducer.loading,
	token: authReducer.token,
});

export default connect(mapStateToProps, { fetchUserQuizzes })(Quizzes);
