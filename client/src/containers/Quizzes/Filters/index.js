import React, { useEffect, useState } from 'react';
import Sort from './Sort';
import Filter from './Filter';

const Filters = ({ quizzes, user, changeQuizzes }) => {
	return (
		<div>
			<Sort quizzes={quizzes} changeQuizzes={changeQuizzes} />
			<Filter quizzes={quizzes} changeQuizzes={changeQuizzes} user={user} />
		</div>
	);
};

export default Filters;
