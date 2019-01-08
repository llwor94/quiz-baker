import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'primereact/dropdown';

const Filter = ({ quizzes, user, changeQuizzes }) => {
	const [ filterOption, setFilterOption ] = useState('ALL');

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
					changeQuizzes(quizzes.filter(quiz => quiz.votes > 0));
					break;
				case 'MUP':
					changeQuizzes(quizzes.filter(quiz => quiz.user_vote));
					break;
				case 'MFV':
					changeQuizzes(quizzes.filter(quiz => quiz.favorite));
					break;
				case 'T':
					changeQuizzes(quizzes.filter(quiz => quiz.score !== null));
					break;
				case 'NT':
					changeQuizzes(quizzes.filter(quiz => quiz.score === null));
					break;
				case 'ALL':
				default:
					changeQuizzes(quizzes);
			}
		},
		[ filterOption ],
	);

	return (
		<Dropdown
			value={filterOption}
			options={user ? userOptions : options}
			onChange={e => {
				setFilterOption(e.value);
			}}
		/>
	);
};

const mapStateToProps = ({ quizReducer, authReducer }) => ({
	quizzes: quizReducer.quizzes,
	loading: quizReducer.loading,
	user: authReducer.user,
});

export default connect(mapStateToProps)(Filter);
