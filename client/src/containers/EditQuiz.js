import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button } from 'primereact/button';

import { fetchQuizForEdit } from '../store/actions/quizActions';
import { fetchQuizQuestions } from '../store/actions/questionActions';
import { EditUserQuiz, Questions } from '../components/Quizzes/Quiz/edit';
import CreateQuestion from './CreateQuestion';

const EditQuiz = ({ ...props }) => {
	const [ isNewQuestion, setIsNewQuestion ] = useState(false);

	const [ edit, setEdit ] = useState(false);
	useEffect(
		() => {
			if (!isNewQuestion) {
				props.fetchQuizForEdit(props.match.params.id);
				props.fetchQuizQuestions(props.match.params.id);
			}
		},
		[ isNewQuestion ],
	);
	if (!props.edittingQuiz) return <div>Loading..</div>;
	else
		return (
			<Fragment>
				<EditUserQuiz quiz={props.edittingQuiz} edit={edit} setEdit={setEdit} />
				{isNewQuestion ? (
					<CreateQuestion setIsNewQuestion={setIsNewQuestion} />
				) : props.edittingQuiz ? (
					<Questions questions={props.questions} setIsNewQuestion={setIsNewQuestion} />
				) : (
					props.error && <div>{props.error}</div>
				)}
			</Fragment>
		);
};

const mapStateToProps = ({ quizReducer, questionReducer }) => ({
	edittingQuiz: quizReducer.edittingQuiz,
	loading: quizReducer.loading,
	error: quizReducer.error,
	questions: questionReducer.questions,
});

export default connect(mapStateToProps, { fetchQuizForEdit, fetchQuizQuestions })(EditQuiz);
