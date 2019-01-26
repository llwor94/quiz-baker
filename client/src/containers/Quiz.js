import React, { useEffect, useState, useContext, createContext } from 'react';
import Loading from '../components/Styles/Loading';
import _ from 'lodash';

import server from '../utils/server';
import { QuizCtx, ResponseCtx } from '../pages/Quiz';
import Quiz from '../components/Quiz';
import Question from '../components/Quiz/Question';
import QuestionTracker from '../components/Quiz/QuestionTracker';
import Results from '../components/Quiz/Results';
import LeaderBoard from '../components/Quiz/LeaderBoard';
import QuizPosts from '../components/Quiz/QuizPosts';

export const QuestionCtx = createContext([ undefined, () => {} ]);
export const QuizPostCtx = createContext([ undefined, () => {} ]);

const QuizContainer = props => {
	const [ quiz, setQuiz ] = useContext(QuizCtx);

	const [ questionResponse, setQuestionReponse ] = useContext(ResponseCtx);
	const [ currentQuestion, setCurrentQuestion ] = useState(undefined);
	const [ quizPosts, setQuizPosts ] = useState(undefined);

	useEffect(() => {
		server.get(`/quizzes/${props.match.params.id}`).then(({ data }) => {
			let retrievedQuiz = data;
			server.get(`/quizzes/${props.match.params.id}/questions`).then(({ data }) => {
				if (retrievedQuiz.time_limit_seconds) {
					console.log(retrievedQuiz.time_limit_seconds);
					retrievedQuiz.questionTimeLimit = Math.round(
						retrievedQuiz.time_limit_seconds / data.length,
					);
				}
				retrievedQuiz.questions = data;
				setQuestionReponse(_.fill(Array(data.length), { correct: null }));
				setQuiz(retrievedQuiz);
			});
		});
	}, []);
	console.log(quiz);
	if (!quiz) return <Loading />;
	else
		return (
			<QuestionCtx.Provider value={[ currentQuestion, setCurrentQuestion ]}>
				<div
					style={{
						width: '70%',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						position: 'relative',
						perspective: '1000px',
						marginTop: '85px',
					}}
				>
					<LeaderBoard />
					{currentQuestion === undefined ? (
						<Quiz {...props} />
					) : currentQuestion === quiz.question_count ? (
						<Results />
					) : (
						<Question />
					)}
					<QuizPostCtx.Provider value={[ quizPosts, setQuizPosts ]}>
						<QuizPosts quiz={quiz} />
					</QuizPostCtx.Provider>
					<QuestionTracker />
				</div>
			</QuestionCtx.Provider>
		);
};

export default QuizContainer;
