import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';

import { fetchQuizForEdit, fetchTopics, editQuiz } from '../store/actions/quizActions';
import { fetchQuizQuestions } from '../store/actions/questionActions';
import EditQuizContainer from './EditQuiz';
import { Button } from 'primereact/button';
import EditQuestionContainer from './EditQuestions';
import { QuestionsWrapper } from '../components/Quizzes/Questions/edit';
import CreateQuestion from './CreateQuestion';

const EditQuizPage = ({ ...props }) => {
	const [ isNewQuestion, setIsNewQuestion ] = useState(false);

	useEffect(() => {
		props.fetchQuizForEdit(props.match.params.id);
		props.fetchQuizQuestions(props.match.params.id);
		props.fetchTopics();
	}, []);

	if (!props.edittingQuiz || !props.topics || !props.questions) return <div>Loading..</div>;
	else {
		return (
			<div>
				<EditQuizContainer quiz={props.edittingQuiz} topics={props.topics} />
				<QuestionsWrapper>
					{props.questions.length ? (
						props.questions.map(question => (
							<EditQuestionContainer question={question} />
						))
					) : (
						<div>This quiz has no questions.</div>
					)}
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
				</QuestionsWrapper>
				<div id='new' />
			</div>
		);
	}
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
})(EditQuizPage);
