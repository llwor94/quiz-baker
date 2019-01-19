import React, { useEffect, useState, useContext, Fragment } from 'react';
import CreateQuiz from './CreateQuiz';
import { UserQuizzesCtx } from '../../pages/Settings';
import { Wrapper, InnerWrapper } from '../../Styles/Settings';
import UserQuiz from './UserQuiz';

const Quizzes = props => {
	const [ userQuizzes, setUserQuizzes ] = useContext(UserQuizzesCtx);
	return (
		<InnerWrapper>
			<CreateQuiz fromSettings />
			<Wrapper>
				{userQuizzes.map(quiz => <UserQuiz key={quiz.id} quiz={quiz} {...props} />)}
			</Wrapper>
		</InnerWrapper>
	);
};

export default Quizzes;
