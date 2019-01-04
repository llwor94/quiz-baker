import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button } from 'primereact/button';

import { fetchQuizForEdit } from '../store/actions/quizActions';
import { fetchQuizQuestions } from '../store/actions/questionActions';
import { EditUserQuiz } from '../components/Quizzes/Quiz/edit';
import CreateQuestion from './CreateQuestion';

const EditQuiz = ({ ...props }) => {
	const [ isNewQuestion, setIsNewQuestion ] = useState(false);
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
				<EditUserQuiz quiz={props.edittingQuiz} />
				{isNewQuestion ? (
					<CreateQuestion setIsNewQuestion={setIsNewQuestion} />
				) : props.edittingQuiz ? (
					<div>
						<div>Questions:</div>
						{props.questions.length ? (
							props.questions.map(question => <div>{question.question}</div>)
						) : (
							<div>This quiz has no questions.</div>
						)}
						<Button label='New Question' onClick={() => setIsNewQuestion(true)} />
					</div>
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
