import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';

import { fetchQuizzes, updateUserFavorite } from '../store/actions/quizActions';
import { fetchQuestion } from '../store/actions/questionActions';

import FiltersContainer from '../containers/Quizzes/Filters/';
import QuizzesContainer from '../containers/Quizzes/Quizzes';

const Quizzes = ({ quizzes, loading, fetchQuizzes, user, updateUserFavorite, ...props }) => {
	const [ showingQuizzes, changeQuizzes ] = useState(null);

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

	if (!showingQuizzes) return <div>Loading...</div>;
	else
		return (
			<Fragment>
				<FiltersContainer
					user={user}
					quizzes={showingQuizzes}
					changeQuizzes={changeQuizzes}
				/>
				<QuizzesContainer quizzes={quizzes} user={user} />
			</Fragment>
		);
};

const mapStateToProps = ({ quizReducer }) => ({
	quizzes: quizReducer.quizzes,
	loading: quizReducer.loading,
});

export default connect(mapStateToProps, { fetchQuizzes, updateUserFavorite, fetchQuestion })(
	Quizzes,
);
