import React, { useEffect, useContext } from 'react';

import server from 'server';

import { UserQuizCtx, QuizQuestionsCtx } from 'pages/UserQuiz';

import Loading from 'components/Loading';
import Quiz from 'components/UserQuiz/Quiz';
import Question from 'components/UserQuiz/Question';
import CreateQuestion from 'components/UserQuiz/CreateQuestion';

import { QuestionWrapper } from 'styles/UserQuiz/Questions';
import { BackButton } from 'styles/Components/Button';

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
					<BackButton
						style={{ position: 'absolute', top: '3px', right: '445px', width: '35px' }}
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
