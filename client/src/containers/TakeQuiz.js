import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';

import { fetchQuiz } from '../store/actions/quizActions';
import { fetchQuizQuestions } from '../store/actions/questionActions';
import { Quiz as QuizWrapper } from '../components/Quizzes/Quiz';
import { Button } from '../components/Quizzes/Quiz/button';
import Question from './Question';

const Quiz = ({ quiz, loading, questions, fetchQuiz, fetchQuizQuestions, ...props }) => {
	useEffect(() => {
		fetchQuiz(props.match.params.id);
		fetchQuizQuestions(props.match.params.id);
	}, []);

	const [ currentQuestion, setQuestion ] = useState(null);

	const manageQuestion = () => {
		if (currentQuestion === null) setQuestion(0);
		else setQuestion(currentQuestion + 1);
	};
	if (quiz)
		return (
			<Fragment>
				{currentQuestion === null ? (
					<QuizWrapper quiz={quiz} />
				) : (
					<Question question={questions[currentQuestion]} />
				)}

				<Button currentQuestion={currentQuestion} handleClick={manageQuestion} />
			</Fragment>
		);
	else return <div>Loading...</div>;
};

const mapStateToProps = ({ quizReducer, questionReducer }) => ({
	quiz: quizReducer.quiz,
	loading: quizReducer.loading,
	questions: questionReducer.questions,
});

export default connect(mapStateToProps, { fetchQuiz, fetchQuizQuestions })(Quiz);
