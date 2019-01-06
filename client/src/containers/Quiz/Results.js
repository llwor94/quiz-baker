import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import server from '../../utils/server';

import { Results as ResultsWrapper } from '../../components/Quizzes/Quiz/results';

const Results = ({ quiz, results }) => {
	console.log(quiz, results);
	useEffect(() => {
		let score = results.filter(result => result.correct).length;
		if (score > quiz.score) {
			server
				.patch(`quizzes/${quiz.id}`, { score: score })
				.then(({ data }) => console.log(data))
				.catch(err => console.log(err));
		}
	}, []);

	return <ResultsWrapper results={results} />;
};

export default connect(null)(Results);
