import React, { useEffect, useState, createContext, useContext } from 'react';
import UserQuizContainer from '../containers/UserQuiz';
import { UserCtx } from '../App';
import Loading from '../components/Styles/Loading';
export const UserQuizCtx = createContext([ undefined, () => {} ]);
export const QuizQuestionsCtx = createContext([ undefined, () => {} ]);
const UserQuiz = props => {
	const [ quiz, setQuiz ] = useState(undefined);
	const [ questions, setQuestions ] = useState(undefined);
	const [ user, setUser ] = useContext(UserCtx);
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
