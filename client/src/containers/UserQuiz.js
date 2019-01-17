import React, { useEffect, useState, useContext } from 'react';
import server from '../utils/server';
import { UserQuizCtx } from '../pages/UserQuiz';
import Loading from '../components/Styles/Loading';
import Quiz from '../components/UserQuiz/Quiz';
const UserQuizContainer = props => {
	const [ quiz, setQuiz ] = useContext(UserQuizCtx);
	useEffect(() => {
		server
			.get(`/quizzes/${props.match.params.id}`)
			.then(({ data }) => {
				setQuiz(data);
			})
			.catch(err => console.log(err));
	}, []);

	if (!quiz) return <Loading />;
	else
		return (
			<div>
				<Quiz />
			</div>
		);
};

export default UserQuizContainer;
