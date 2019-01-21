import React, { useState, useContext, Fragment } from 'react';

import server from '../../utils/server';
import _ from 'lodash';
import { Calendar } from 'primereact/calendar';
import { Button } from '../../Styles/Components/Button';
import { Wrapper, InnerWrapper, ModalWrapper } from '../../Styles/Settings/CreateQuiz';
import QuizForm from './QuizForm';

import { UserQuizzesCtx } from '../../pages/Settings';
import { UserCtx } from '../../App';

const CreateQuiz = () => {
	const [ newQuiz, setNewQuiz ] = useState(false);
	const [ quiz, setQuiz ] = useState({ title: '', description: '', topic: '' });
	const [ userQuizzes, setUserQuizzes ] = useContext(UserQuizzesCtx);
	const [ user, setUser ] = useContext(UserCtx);
	const [ timeLimit, setTimeLimit ] = useState(undefined);

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

	return (
		<Fragment>
			<Button label='Create a New Quiz' onClick={() => setNewQuiz(true)} />
			{newQuiz && (
				<ModalWrapper>
					<Wrapper>
						<Button
							style={{ position: 'absolute', top: '5px', right: '5px' }}
							icon='pi pi-times'
							white
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
								label='Bake Quiz!'
								disabled={!quiz.title || !quiz.topic}
								onClick={handleCreateQuiz}
							/>

						</InnerWrapper>
					</Wrapper>
				</ModalWrapper>
			)}
		</Fragment>
	);
};

export default CreateQuiz;
