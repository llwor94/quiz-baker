import React, { Fragment } from 'react';
import Sort from './Sort';
import Filter from './Filter';
import TopicSort from './Topics';

const Filters = ({ quizzes, changeQuizzes, topics }) => {
	return (
		<Fragment>
			<TopicSort topics={topics} quizzes={quizzes} changeQuizzes={changeQuizzes} />
			<div style={{ margin: '10px 0' }}>
				<Sort quizzes={quizzes} changeQuizzes={changeQuizzes} />
				<Filter quizzes={quizzes} changeQuizzes={changeQuizzes} />
			</div>
		</Fragment>
	);
};

export default Filters;
