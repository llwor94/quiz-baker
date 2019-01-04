import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { fetchQuizForEdit } from '../store/actions/quizActions';
import CreateQuestion from './CreateQuestion';

const EditQuiz = ({ ...props }) => {
	useEffect(() => {
		props.fetchQuizForEdit(props.match.params.id);
	}, []);

	if (props.edittingQuiz) return <div>{props.edittingQuiz.title}</div>;
	else if (props.error) return <div>{props.error}</div>;
	else return <div>Loading</div>;
};

const mapStateToProps = ({ quizReducer, questionReducer }) => ({
	edittingQuiz: quizReducer.edittingQuiz,
	loading: questionReducer.loading,
	error: questionReducer.error,
});

export default connect(mapStateToProps, { fetchQuizForEdit })(EditQuiz);
