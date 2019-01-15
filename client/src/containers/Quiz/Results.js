import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import server from '../../utils/server';

import { Results as ResultsWrapper } from '../../components/Quizzes/Quiz/results';

const Results = ({ quiz, results, handleCopy, handleFavoriteToggle }) => {
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

	return (
		<ResultsWrapper results={results}>
			<div style={{ display: 'flex' }}>
				<div onClick={handleCopy}>Share</div>
				<div onClick={handleFavoriteToggle}>Is favorited: {quiz.favorite}</div>
			</div>
		</ResultsWrapper>
	);
};

export default connect(null)(Results);
