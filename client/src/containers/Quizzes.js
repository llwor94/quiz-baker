import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'primereact/dropdown';

import { fetchQuizzes, updateUserFavorite } from '../store/actions/quizActions';
import { Quiz } from '../components/Quizzes/Quiz';

const Quizzes = ({ quizzes, loading, fetchQuizzes, user, updateUserFavorite, ...props }) => {
	const [ sortOption, setSortOption ] = useState('MR');
	const [ filterOption, setFilterOption ] = useState('ALL');
	const [ displayingQuizzes, changeQuizzes ] = useState(null);

	const sortOptions = [
		{ label: 'Most Recent', value: 'MR' },
		{ label: 'Most Upvoted', value: 'MU' },
	];
	const filterOptions = [ { label: 'All', value: 'ALL' }, { label: 'Upvoted', value: 'ALLUP' } ];

	const userFilterOptions = [
		{ label: 'All', value: 'ALL' },
		{ label: 'All Upvoted', value: 'ALLUP' },
		{ label: 'My Upvotes', value: 'MUP' },
		{ label: 'My Favorites', value: 'MFV' },
		{ label: 'Taken', value: 'T' },
		{ label: 'Not Taken', value: 'NT' },
	];

	useEffect(() => {
		fetchQuizzes();
	}, []);

	useEffect(
		() => {
			if (quizzes) {
				changeQuizzes(quizzes);
			}
		},
		[ quizzes ],
	);

	useEffect(
		() => {
			if (displayingQuizzes) {
				if (sortOption === 'MU') {
					changeQuizzes(displayingQuizzes.sort((a, b) => b.votes - a.votes));
				} else if (sortOption === 'MR') {
					changeQuizzes(displayingQuizzes.sort((a, b) => b.id - a.id));
				}
			}
		},
		[ sortOption ],
	);

	useEffect(
		() => {
			if (displayingQuizzes) {
				if (filterOption === 'ALL') {
					changeQuizzes(quizzes);
				} else if (filterOption === 'ALLUP') {
					let newQuizzes = quizzes.filter(quiz => quiz.votes > 0);
					changeQuizzes(newQuizzes);
				} else if (filterOption === 'MUP') {
					changeQuizzes(quizzes.filter(quiz => quiz.vote));
				} else if (filterOption === 'MFV') {
					changeQuizzes(quizzes.filter(quiz => quiz.favorite));
				} else if (filterOption === 'T') {
					changeQuizzes(quizzes.filter(quiz => quiz.score !== null));
				} else if (filterOption === 'NT') {
					changeQuizzes(quizzes.filter(quiz => quiz.score === null));
				}
			}
		},
		[ filterOption ],
	);

	const handleFavoriteToggle = quiz => {
		updateUserFavorite(!quiz.favorite, quiz.id);
	};

	const pushQuiz = id => {
		props.history.push(`quizzes/${id}`);
	};
	if (displayingQuizzes)
		return (
			<div>
				<Dropdown
					value={sortOption}
					options={sortOptions}
					onChange={e => {
						setSortOption(e.value);
					}}
				/>
				<Dropdown
					value={filterOption}
					options={user.id ? userFilterOptions : filterOptions}
					onChange={e => {
						setFilterOption(e.value);
					}}
				/>

				{displayingQuizzes.map(quiz => (
					<Quiz
						key={quiz.id}
						quiz={quiz}
						user={user}
						handleClick={() => pushQuiz(quiz.id)}
						mainPage={true}
						handleFavoriteToggle={() => handleFavoriteToggle(quiz)}
					/>
				))}
			</div>
		);
	else return <div>Loading...</div>;
};

const mapStateToProps = ({ quizReducer }) => ({
	quizzes: quizReducer.quizzes,
	loading: quizReducer.loading,
});

export default connect(mapStateToProps, { fetchQuizzes, updateUserFavorite })(Quizzes);