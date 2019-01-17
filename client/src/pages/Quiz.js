import React, { useState, createContext } from 'react';

import QuizContainer from '../containers/Quiz';

export const QuizCtx = createContext([ undefined, () => {} ]);

const QuizPage = props => {
	const [ quiz, setQuiz ] = useState(undefined);

	return (
		<QuizCtx.Provider value={[ quiz, setQuiz ]}>
			<QuizContainer {...props} />
		</QuizCtx.Provider>
	);
};

export default QuizPage;
