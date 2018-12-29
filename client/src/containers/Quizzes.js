import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchQuizzes } from '../store/actions/quizActions';
import { Quiz } from '../components/Quizzes/Quiz';

const Quizzes = ({ quizzes, loading, fetchQuizzes, ...props }) => {
	useEffect(
		() => {
			if (!quizzes) {
				fetchQuizzes();
			}
		},
		[ quizzes ],
	);
	if (quizzes) return <div>{quizzes.map(quiz => <Quiz quiz={quiz} />)}</div>;
	else return <div>Loading...</div>;
};

const mapStateToProps = ({ quizReducer }) => ({
	quizzes: quizReducer.quizzes,
	loading: quizReducer.loading,
});

export default connect(mapStateToProps, { fetchQuizzes })(Quizzes);
