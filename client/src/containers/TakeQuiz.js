import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

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

	const checkAnswer = option => {
		console.log(option, questions[currentQuestion].id, quiz.id);

		axios({
			method: 'get',
			url: `https://lambda-study-app.herokuapp.com/api/quizzes/${quiz.id}/questions/${questions[
				currentQuestion
			].id}/response`,
			params: {
				option,
			},
		})
			.then(({ data }) => console.log(data))
			.catch(err => console.log(err));
	};

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
					<Question
						quiz={quiz}
						question={questions[currentQuestion]}
						checkAnswer={checkAnswer}
					/>
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
