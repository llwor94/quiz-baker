import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchQuiz, updateUserScore } from '../../store/actions/quizActions';
import Question from './Question';
import Results from './Results';
import { Quiz as QuizWrapper } from '../../components/Quizzes/Quiz';
import { QuestionTracker } from '../../components/Quizzes/Questions/QuestionTracker';
import { Button } from '../../components/Quizzes/button';

const Quiz = ({ quiz, questions, user, ...props }) => {
	const [ questionResponse, setQuestionResponse ] = useState(null);
	const [ currentQuestion, setQuestion ] = useState(null);

	useEffect(() => {
		setQuestionResponse(_.fill(Array(questions.length), { correct: null }));
	}, []);

	const handleAnswer = newQuestion => {
		let newQuestions = [ ...questionResponse ];
		newQuestions[currentQuestion] = newQuestion;
		setQuestionResponse(newQuestions);
		setQuestion(currentQuestion + 1);
	};

	return (
		<Fragment>
			{currentQuestion === null ? (
				<QuizWrapper quiz={quiz} user={user} />
			) : currentQuestion === questions.length ? (
				<Results quiz={quiz} results={questionResponse} />
			) : (
				<Question
					quiz={quiz}
					question={questions[currentQuestion]}
					handleAnswer={handleAnswer}
					currentQuestion={currentQuestion}
					questionResponse={questionResponse}
				/>
			)}
			{currentQuestion === null && (
				<Button
					currentQuestion={currentQuestion}
					text='Take Quiz'
					handleClick={() => setQuestion(0)}
				/>
			)}
			<QuestionTracker questions={questionResponse} currentQuestion={currentQuestion} />
		</Fragment>
	);
};

const mapStateToProps = ({ quizReducer, questionReducer }) => ({
	quiz: quizReducer.quiz,
	loading: quizReducer.loading,
	questions: questionReducer.questions,
});

export default connect(mapStateToProps, { fetchQuiz, updateUserScore })(Quiz);
