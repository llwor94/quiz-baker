import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { updateUserScore } from '../../store/actions/quizActions';
import { Results as ResultsWrapper } from '../../components/Quizzes/Quiz/results';

const Results = ({ quiz, results, updateUserScore }) => {
	console.log(quiz, results);
	useEffect(() => {
		let score = results.filter(result => result.correct).length;
		console.log(score, quiz);
		if (score > quiz.score) {
			updateUserScore(score, quiz.id);
		}
	}, []);

	return <ResultsWrapper results={results} />;
};

export default connect(null, { updateUserScore })(Results);
