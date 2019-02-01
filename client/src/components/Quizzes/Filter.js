import React, { useEffect, useState, useContext } from 'react';
import { Dropdown } from 'primereact/dropdown';

import { QuizzesCtx } from '../../pages/Quizzes';
import { AuthCtx } from '../../Auth';

const Filter = () => {
	const [ filterOption, setFilterOption ] = useState('ALL');
	const [ quizzes, setQuizzes ] = useContext(QuizzesCtx);
	const { user } = useContext(AuthCtx);
	const [ allQuizzes, setAllQuizzes ] = useState(quizzes);

	const options = [ { label: 'All', value: 'ALL' }, { label: 'Upvoted', value: 'ALLUP' } ];

	const userOptions = [
		{ label: 'All', value: 'ALL' },
		{ label: 'All Upvoted', value: 'ALLUP' },
		{ label: 'My Upvotes', value: 'MUP' },
		{ label: 'My Favorites', value: 'MFV' },
		{ label: 'Taken', value: 'T' },
		{ label: 'Not Taken', value: 'NT' },
	];

	useEffect(
		() => {
			switch (filterOption) {
				case 'ALLUP':
					setQuizzes(allQuizzes.filter(quiz => quiz.votes > 0));
					break;
				case 'MUP':
					setQuizzes(allQuizzes.filter(quiz => quiz.user_vote === 1));
					break;
				case 'MFV':
					setQuizzes(allQuizzes.filter(quiz => quiz.favorite));
					break;
				case 'T':
					setQuizzes(allQuizzes.filter(quiz => quiz.score !== null));
					break;
				case 'NT':
					setQuizzes(allQuizzes.filter(quiz => quiz.score === null));
					break;
				case 'ALL':
				default:
					setQuizzes(allQuizzes);
			}
		},
		[ filterOption ],
	);

	return (
		<Dropdown
			style={{ marginLeft: '8px' }}
			value={filterOption}
			options={user ? userOptions : options}
			onChange={e => {
				setFilterOption(e.value);
			}}
		/>
	);
};

export default Filter;
