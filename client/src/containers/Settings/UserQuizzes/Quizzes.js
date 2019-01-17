import React from 'react';
import { connect } from 'react-redux';

import server from '../../../utils/server';

import { fetchUserQuizzes } from '../../../store/actions/quizActions';
import { Quiz } from '../../../components/Quizzes/Quiz/userQuiz';
import CreateQuiz from './CreateQuiz';

const Quizzes = ({ quizzes, fetchUserQuizzes, ...props }) => {
	const deleteQuiz = id => {
		server
			.delete(`quizzes/${id}`)
			.then(response => {
				fetchUserQuizzes();
			})
			.catch(error => console.log(error));
	};
	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<CreateQuiz />
			{quizzes.map(quiz => (
				<Quiz
					key={quiz.id}
					quiz={quiz}
					handleDelete={() => deleteQuiz(quiz.id)}
					handleClick={() => props.history.push(`/quizzes/edit/${quiz.id}`)}
				/>
			))}
		</div>
	);
};

const mapStateToProps = ({ quizReducer }) => ({
	quizzes: quizReducer.userQuizzes,
	loading: quizReducer.loading,
});

export default connect(mapStateToProps, { fetchUserQuizzes })(Quizzes);