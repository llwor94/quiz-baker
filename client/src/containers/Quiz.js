import React, { useEffect, useState, useContext } from 'react';
import Loading from '../components/Styles/Loading';
import { UserCtx } from '../App';

import server from '../utils/server';
import { QuizCtx } from '../pages/Quiz';
import { Wrapper } from '../Styles/Quizzes';

const Quiz = props => {
	const [ quiz, setQuiz ] = useContext(QuizCtx);
	const [ user, setUser ] = useContext(UserCtx);
	useEffect(() => {
		server.get(`/quizzes/${props.match.params.id}`).then(({ data }) => {
			console.log(data);
			setQuiz(data);
		});
	}, []);

	if (!quiz) return <Loading />;
	else return <Wrapper>hi</Wrapper>;
};

export default Quiz;
