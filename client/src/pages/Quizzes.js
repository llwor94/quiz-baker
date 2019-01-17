import React, { useEffect, useState, createContext } from 'react';

import QuizzesContainer from '../containers/Quizzes';

export const QuizzesCtx = createContext([ undefined, () => {} ]);

const QuizzesPage = props => {
	const [ quizzes, setQuizzes ] = useState(undefined);

	return (
		<QuizzesCtx.Provider value={[ quizzes, setQuizzes ]}>
			<QuizzesContainer {...props} />
		</QuizzesCtx.Provider>
	);
};

export default QuizzesPage;
