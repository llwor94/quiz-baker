import React, { Fragment } from 'react';
import Sort from './Sort';
import Filter from './Filter';

const Filters = ({ quizzes, changeQuizzes }) => {
	return (
		<Fragment>
			<div style={{ margin: '20px 0', display: 'flex', justifyContent: 'center' }}>
				<Sort quizzes={quizzes} changeQuizzes={changeQuizzes} />
				<Filter quizzes={quizzes} changeQuizzes={changeQuizzes} />
			</div>
		</Fragment>
	);
};

export default Filters;
