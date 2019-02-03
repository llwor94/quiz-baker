import React, { useState, createContext, useContext } from 'react';

import UserQuizContainer from 'containers/UserQuiz';
import { AuthCtx } from 'auth';
import Loading from 'components/Loading';

export const UserQuizCtx = createContext([ undefined, () => {} ]);
export const QuizQuestionsCtx = createContext([ undefined, () => {} ]);

const UserQuiz = props => {
	const [ quiz, setQuiz ] = useState(undefined);
	const [ questions, setQuestions ] = useState(undefined);
	const { user } = useContext(AuthCtx);

	if (!user) return <Loading />;
	else
		return (
			<UserQuizCtx.Provider value={[ quiz, setQuiz ]}>
				<QuizQuestionsCtx.Provider value={[ questions, setQuestions ]}>
					<UserQuizContainer {...props} />
				</QuizQuestionsCtx.Provider>
			</UserQuizCtx.Provider>
		);
};

export default UserQuiz;
