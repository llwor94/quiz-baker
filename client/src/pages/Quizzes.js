import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';

import { fetchQuizzes } from '../store/actions/quizActions';

import FiltersContainer from '../containers/Quizzes/Filters/';
import QuizzesContainer from '../containers/Quizzes/Quizzes';

const QuizzesPage = ({ quizzes, loading, fetchQuizzes, user, ...props }) => {
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
				<QuizzesContainer quizzes={showingQuizzes} user={user} {...props} />
			</Fragment>
		);
};

const mapStateToProps = ({ quizReducer }) => ({
	quizzes: quizReducer.quizzes,
	loading: quizReducer.loading,
});

export default connect(mapStateToProps, { fetchQuizzes })(QuizzesPage);
