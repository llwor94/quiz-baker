import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchQuiz } from '../store/actions/quizActions';

const Quiz = ({ quiz, loading, fetchQuiz, ...props }) => {
	useEffect(() => {
		fetchQuiz(props.match.params.id);
	}, []);

	if (quiz) return <div>Hi</div>;
	else return <div>Loading...</div>;
};

const mapStateToProps = ({ quizReducer }) => ({
	quiz: quizReducer.quiz,
	loading: quizReducer.loading,
});

export default connect(mapStateToProps, { fetchQuiz })(Quiz);
