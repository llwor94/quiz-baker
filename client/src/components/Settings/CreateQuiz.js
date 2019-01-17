import React, { useState, useContext } from 'react';

import server from '../../utils/server';
import _ from 'lodash';

import { Button } from '../../Styles/Components/Button';
import { Wrapper, InnerWrapper } from '../../Styles/Settings/CreateQuiz';
import QuizForm from './QuizForm';

import { UserQuizzesCtx } from '../../pages/Settings';
import { UserCtx } from '../../App';

const CreateQuiz = () => {
	const [ newQuiz, setNewQuiz ] = useState(false);
	const [ quiz, setQuiz ] = useState({ title: '', description: '', topic: '' });
	const [ userQuizzes, setUserQuizzes ] = useContext(UserQuizzesCtx);
	const [ user, setUser ] = useContext(UserCtx);

	const handleCreateQuiz = () => {
		server
			.post('/quizzes', quiz)
			.then(response => {
				server.get('/quizzes').then(({ data }) => {
					setUserQuizzes(data.filter(quiz => quiz.author === user.username)).sort(
						(a, b) => b.id - a.id,
					);
				});
				setQuiz(_.mapValues(quiz, ''));
				setNewQuiz(false);
			})
			.catch(error => console.log(error));
	};
	console.log(newQuiz);

	if (!newQuiz)
		return (
			<Button
				label='Create a New Quiz'
				onClick={() => setNewQuiz(true)}
				style={{ marginBottom: '10px' }}
				full
			/>
		);
	else
		return (
			<Wrapper>
				<Button
					style={{ position: 'absolute', top: '5px', right: '5px' }}
					icon='pi pi-times'
					className='p-button-secondary'
					onClick={() => setNewQuiz(false)}
				/>
				<QuizForm quiz={quiz} setQuiz={setQuiz} />
				<InnerWrapper>
					{!quiz.topic &&
					quiz.title && (
						<div>
							Please select a topic for your quiz{' '}
							<span style={{ fontWeight: 'bold' }}>{quiz.title}</span>
						</div>
					)}
					{quiz.topic &&
					!quiz.title && (
						<div>
							Please name your quiz for topic{' '}
							<span style={{ fontWeight: 'bold' }}>{quiz.topic}</span>
						</div>
					)}

					<Button
						label='Create Quiz?'
						disabled={!quiz.title || !quiz.topic}
						onClick={handleCreateQuiz}
					/>
				</InnerWrapper>
			</Wrapper>
		);
};

export default CreateQuiz;
