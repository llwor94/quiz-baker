import React, { useEffect, useState, useContext } from 'react';
import { Dropdown } from 'primereact/dropdown';

import { QuizzesCtx } from 'pages/Quizzes';

const Sort = () => {
	const [ quizzes, setQuizzes ] = useContext(QuizzesCtx);
	const [ sortOption, setSortOption ] = useState('MR');

	const sortOptions = [
		{ label: 'Most Recent', value: 'MR' },
		{ label: 'Most Upvoted', value: 'MU' },
	];

	useEffect(
		() => {
			if (sortOption === 'MU') {
				setQuizzes([ ...quizzes ].sort((a, b) => b.votes - a.votes));
			} else if (sortOption === 'MR') {
				setQuizzes([ ...quizzes ].sort((a, b) => b.id - a.id));
			}
		},
		[ sortOption ],
	);

	return (
		<Dropdown
			style={{ marginRight: '8px' }}
			value={sortOption}
			options={sortOptions}
			onChange={e => {
				setSortOption(e.value);
			}}
		/>
	);
};

export default Sort;
