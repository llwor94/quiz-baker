import React, { useEffect, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';

const Sort = ({ quizzes, changeQuizzes }) => {
	const [ sortOption, setSortOption ] = useState('MR');

	const sortOptions = [
		{ label: 'Most Recent', value: 'MR' },
		{ label: 'Most Upvoted', value: 'MU' },
	];

	useEffect(
		() => {
			if (sortOption === 'MU') {
				changeQuizzes([ ...quizzes ].sort((a, b) => b.votes - a.votes));
			} else if (sortOption === 'MR') {
				changeQuizzes([ ...quizzes ].sort((a, b) => b.id - a.id));
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
