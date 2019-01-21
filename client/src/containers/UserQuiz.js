import React, { useEffect, useState, useContext, Fragment } from 'react';
import server from '../utils/server';
import { UserQuizCtx, QuizQuestionsCtx } from '../pages/UserQuiz';
import Loading from '../components/Styles/Loading';
import Quiz from '../components/UserQuiz/Quiz';
import Question from '../components/UserQuiz/Question';
import { QuestionWrapper } from '../Styles/UserQuiz/Questions';
import CreateQuestion from '../components/UserQuiz/CreateQuestion';
import { Button } from '../Styles/Components/Button';
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
			<div
				style={{
					width: '100%',
					display: 'flex',
					justifyContent: 'center',
					marginTop: '80px',
				}}
			>
				<div style={{ width: '400px', position: 'relative' }}>
					<Button
						style={{ position: 'absolute', top: 0, left: -68 }}
						secondary
						icon='pi pi-arrow-left'
						onClick={() => props.history.goBack()}
					/>
					<Quiz />
					<QuestionWrapper main>
						{questions.length ? (
							questions.map(question => <Question question={question} />)
						) : (
							<p className='no-questions'>This quiz has no questions.</p>
						)}
						<CreateQuestion />
					</QuestionWrapper>
				</div>
			</div>
		);
};

export default UserQuizContainer;
