import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button } from 'primereact/button';

import { fetchQuizForEdit } from '../store/actions/quizActions';
import { fetchQuizQuestions } from '../store/actions/questionActions';
import { EditUserQuiz } from '../components/Quizzes/Quiz/edit';
import CreateQuestion from './CreateQuestion';

const EditQuiz = ({ ...props }) => {
	useEffect(() => {
		props.fetchQuizForEdit(props.match.params.id);
		props.fetchQuizQuestions(props.match.params.id);
	}, []);

	if (props.edittingQuiz)
		return (
			<div>
				<EditUserQuiz quiz={props.edittingQuiz} />
				<div>Questions:</div>
				{props.questions ? (
					props.questions.map(question => <div>{question.question}</div>)
				) : (
					'This quiz has no questions.'
				)}
				<Button label='New Question' />
			</div>
		);
	else if (props.error) return <div>{props.error}</div>;
	else return <div>Loading</div>;
};

const mapStateToProps = ({ quizReducer, questionReducer }) => ({
	edittingQuiz: quizReducer.edittingQuiz,
	loading: quizReducer.loading,
	error: quizReducer.error,
	questions: questionReducer.questions,
});

export default connect(mapStateToProps, { fetchQuizForEdit, fetchQuizQuestions })(EditQuiz);
