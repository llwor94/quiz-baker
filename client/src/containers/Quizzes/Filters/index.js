import React, { useEffect, useState, Fragment } from 'react';
import Sort from './Sort';
import Filter from './Filter';
import TopicSort from './Topics';

const Filters = ({ quizzes, user, changeQuizzes, topics }) => {
	return (
		<Fragment>
			<TopicSort topics={topics} />
			<div style={{ margin: '10px 0' }}>
				<Sort quizzes={quizzes} changeQuizzes={changeQuizzes} />
				<Filter quizzes={quizzes} changeQuizzes={changeQuizzes} user={user} />
			</div>
		</Fragment>
	);
};

export default Filters;
