import React, { useEffect, useState, useContext } from 'react';
import Loading from '../components/Styles/Loading';
import { UserCtx } from '../App';

import server from '../utils/server';
import { QuizzesCtx } from '../pages/Quizzes';
import { Wrapper } from '../Styles/Quizzes';
import Quiz from '../components/Quizzes/Quiz';

const Quizzes = props => {
	const [ quizzes, setQuizzes ] = useContext(QuizzesCtx);
	const [ user, setUser ] = useContext(UserCtx);
	useEffect(() => {
		server
			.get('/quizzes')
			.then(({ data }) => {
				setQuizzes(data.filter(quiz => quiz.question_count).sort((a, b) => b.id - a.id));
			})
			.catch(err => console.log(err));
	}, []);

	useEffect(
		() => {
			server
				.get('/quizzes')
				.then(({ data }) => {
					setQuizzes(
						data.filter(quiz => quiz.question_count).sort((a, b) => b.id - a.id),
					);
				})
				.catch(err => console.log(err));
		},
		[ user ],
	);
	console.log(quizzes);
	if (!quizzes) return <Loading />;
	else
		return (
			<Wrapper>{quizzes.map(quiz => <Quiz key={quiz.id} quiz={quiz} {...props} />)}</Wrapper>
		);
};

export default Quizzes;
