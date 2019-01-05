import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { fetchQuizForEdit, fetchTopics, editQuiz } from '../../../store/actions/quizActions';
import { fetchQuizQuestions } from '../../../store/actions/questionActions';

import { Button } from 'primereact/button';
import EditQuestionContainer from './EditQuestions';
import { QuestionsWrapper } from '../../../components/Quizzes/Questions/edit';
import CreateQuestion from './CreateQuestion';

const Questions = ({ ...props }) => {
	const [ isNewQuestion, setIsNewQuestion ] = useState(false);

	return (
		<QuestionsWrapper>
			{props.questions.length ? (
				props.questions.map(question => <EditQuestionContainer question={question} />)
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
})(Questions);
