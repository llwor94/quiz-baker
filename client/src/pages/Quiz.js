import React, { useState, createContext } from 'react';

import QuizContainer from 'containers/Quiz';

export const QuizCtx = createContext([ undefined, () => {} ]);
export const ResponseCtx = createContext([ undefined, () => {} ]);

const QuizPage = props => {
	const [ quiz, setQuiz ] = useState(undefined);
	const [ questionResponse, setQuestionReponse ] = useState(undefined);

	return (
		<QuizCtx.Provider value={[ quiz, setQuiz ]}>
			<ResponseCtx.Provider value={[ questionResponse, setQuestionReponse ]}>
				<QuizContainer {...props} />
			</ResponseCtx.Provider>
		</QuizCtx.Provider>
	);
};

export default QuizPage;
