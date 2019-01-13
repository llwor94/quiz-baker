import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import server from '../../utils/server';
import _ from 'lodash';

import { fetchQuiz } from '../../store/actions/quizActions';
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

	const handleFavoriteToggle = () => {
		server
			.patch(`quizzes/${quiz.id}`, { favorite: !quiz.favorite })
			.then(({ data }) => {
				console.log(data);
				fetchQuiz(quiz.id);
			})
			.catch(err => console.log(err));
	};

	const handleUserVote = val => {
		console.log(quiz, val);
		let user_vote;
		if (val === quiz.user_vote) {
			user_vote = 0;
		} else {
			user_vote = val;
		}
		server
			.patch(`quizzes/${quiz.id}`, { vote: user_vote })
			.then(({ data }) => {
				console.log(data);
				fetchQuiz(quiz.id);
			})
			.catch(err => console.log(err));
	};

	return (
		<Fragment>
			{currentQuestion === null ? (
				<Fragment>
					<QuizWrapper
						quiz={quiz}
						user={user}
						handleFavoriteToggle={() => handleFavoriteToggle(quiz)}
						handleVote={val => handleUserVote(val)}
					/>
					<Button
						currentQuestion={currentQuestion}
						text='Take Quiz'
						handleClick={() => setQuestion(0)}
					/>
				</Fragment>
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

			<QuestionTracker questions={questionResponse} currentQuestion={currentQuestion} />
		</Fragment>
	);
};

const mapStateToProps = ({ quizReducer, questionReducer, authReducer }) => ({
	quiz: quizReducer.quiz,
	loading: quizReducer.loading,
	questions: questionReducer.questions,
	user: authReducer.user,
});

export default connect(mapStateToProps, { fetchQuiz })(Quiz);
