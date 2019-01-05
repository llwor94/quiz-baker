import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button } from 'primereact/button';

import { fetchQuizForEdit, fetchTopics, editQuiz } from '../store/actions/quizActions';
import { fetchQuizQuestions } from '../store/actions/questionActions';
import EditUserQuiz, { Questions } from '../components/Quizzes/Quiz/edit';
import CreateQuestion from './CreateQuestion';

const EditQuiz = ({ ...props }) => {
	const [ isNewQuestion, setIsNewQuestion ] = useState(false);

	const [ edit, setEdit ] = useState(false);

	const handleQuizEdit = quiz => {
		console.log('editted quiz: ', quiz);
		props.editQuiz(quiz);
	};

	useEffect(
		() => {
			if (!isNewQuestion) {
				props.fetchQuizForEdit(props.match.params.id);
				props.fetchQuizQuestions(props.match.params.id);
				props.fetchTopics();
			}
		},
		[ isNewQuestion ],
	);
	if (!props.edittingQuiz || !props.topics || !props.questions) return <div>Loading..</div>;
	else
		return (
			<div>
				<EditUserQuiz
					quiz={props.edittingQuiz}
					edit={edit}
					setEdit={setEdit}
					topics={props.topics}
					editQuiz={handleQuizEdit}
					loading={props.loading}
				/>
				{props.edittingQuiz ? (
					<Questions questions={props.questions} setIsNewQuestion={setIsNewQuestion}>
						{isNewQuestion ? (
							<CreateQuestion setIsNewQuestion={setIsNewQuestion} />
						) : (
							<a href='#new'>
								<Button
									style={{ width: '100%' }}
									label='New Question'
									onClick={() => {
										setIsNewQuestion(true);
									}}
								/>
							</a>
						)}
					</Questions>
				) : (
					props.error && <div>{props.error}</div>
				)}
				<div id='new' />
			</div>
		);
};

const mapStateToProps = ({ quizReducer, questionReducer }) => ({
	edittingQuiz: quizReducer.edittingQuiz,
	loading: quizReducer.loading,
	error: quizReducer.error,
	questions: questionReducer.questions,
	topics: quizReducer.topics,
});

export default connect(mapStateToProps, {
	fetchQuizForEdit,
	fetchQuizQuestions,
	fetchTopics,
	editQuiz,
})(EditQuiz);
