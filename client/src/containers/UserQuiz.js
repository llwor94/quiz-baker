import React, { useEffect, useState, useContext, Fragment } from 'react';
import server from '../utils/server';
import { UserQuizCtx, QuizQuestionsCtx } from '../pages/UserQuiz';
import Loading from '../components/Styles/Loading';
import Quiz from '../components/UserQuiz/Quiz';
import Question from '../components/UserQuiz/Question';
import { QuestionWrapper } from '../Styles/UserQuiz/Questions';
import CreateQuestion from '../components/UserQuiz/CreateQuestion';

const UserQuizContainer = props => {
	const [ quiz, setQuiz ] = useContext(UserQuizCtx);
	const [ questions, setQuestions ] = useContext(QuizQuestionsCtx);
	useEffect(() => {
		server
			.get(`/quizzes/${props.match.params.id}`)
			.then(({ data }) => {
				setQuiz(data);
				server.get(`/quizzes/${props.match.params.id}/questions`).then(({ data }) => {
					setQuestions(data);
				});
			})
			.catch(err => console.log(err));
	}, []);

	if (!quiz || questions === undefined) return <Loading />;
	else
		return (
			<Fragment>
				<Quiz />
				<QuestionWrapper main>
					{questions.length ? (
						questions.map(question => <Question question={question} />)
					) : (
						<div>This quiz has no questions.</div>
					)}
					<CreateQuestion />
				</QuestionWrapper>
			</Fragment>
		);
};

export default UserQuizContainer;
