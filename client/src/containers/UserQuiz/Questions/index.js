import React, { useState } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/Styles/Button';
import EditQuestionContainer from './EditQuestions';
import { QuestionsWrapper } from '../../../components/Quizzes/Questions/edit';
import CreateQuestionContainer from './CreateQuestion';

const Questions = ({ questions, ...props }) => {
	const [ isNewQuestion, setIsNewQuestion ] = useState(false);

	return (
		<QuestionsWrapper>
			{questions.length ? (
				questions.map(question => <EditQuestionContainer question={question} />)
			) : (
				<div>This quiz has no questions.</div>
			)}
			{isNewQuestion ? (
				<CreateQuestionContainer setIsNewQuestion={setIsNewQuestion} />
			) : (
				<a href='#new'>
					<Button
						label='New Question'
						onClick={() => {
							setIsNewQuestion(true);
						}}
						full
					/>
				</a>
			)}
		</QuestionsWrapper>
	);
};

const mapStateToProps = ({ quizReducer }) => ({
	edittingQuiz: quizReducer.edittingQuiz,
	loading: quizReducer.loading,
	error: quizReducer.error,
	questions: quizReducer.questions,
	topics: quizReducer.topics,
});

export default connect(mapStateToProps)(Questions);
