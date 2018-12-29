import React, { useState } from 'react';
import { connect } from 'react-redux';

import { fetchQuizzes } from '../store/actions/quizActions';

const Quizzes = ({ quizzes, loading, fetchQuizzes, ...props }) => {
	useEffect(
		() => {
			if (!quizzes) {
				fetchQuizzes();
			}
		},
		[ quizzes ],
	);
	if (quizzes)
		return (
			<div>
				{quizzes.map(quiz => (
					<div>
						<h1>{quiz.title}</h1>
					</div>
				))}
			</div>
		);
	else return <div>Loading...</div>;
};

const mapStateToProps = ({ quizReducer }) => ({
	quizzes: quizReducer.quizzes,
	loading: quizReducer.loading,
});

export default connect(mapStateToProps, { fetchQuizzes })(Quizzes);
