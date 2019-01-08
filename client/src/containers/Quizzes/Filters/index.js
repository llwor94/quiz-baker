import React, { Fragment } from 'react';
import Sort from './Sort';
import Filter from './Filter';
import TopicSort from './Topics';

const Filters = ({ quizzes, changeQuizzes, topics }) => {
	return (
		<Fragment>
			<div style={{ margin: '10px 0', display: 'flex', justifyContent: 'center' }}>
				<Sort quizzes={quizzes} changeQuizzes={changeQuizzes} />
				<Filter quizzes={quizzes} changeQuizzes={changeQuizzes} />
			</div>
		</Fragment>
	);
};

export default Filters;
