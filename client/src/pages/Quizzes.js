import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';

import { fetchQuizzes, fetchTopics } from '../store/actions/quizActions';

import FiltersContainer from '../containers/Quizzes/Filters/';
import QuizzesContainer from '../containers/Quizzes/Quizzes';

const QuizzesPage = ({ quizzes, loading, fetchQuizzes, fetchTopics, topics, user, ...props }) => {
	const [ showingQuizzes, changeQuizzes ] = useState(null);

	useEffect(() => {
		fetchQuizzes();
		fetchTopics();
	}, []);

	useEffect(
		() => {
			if (quizzes) {
				changeQuizzes(quizzes);
			}
		},
		[ quizzes ],
	);

	if (!showingQuizzes || !topics) return <div>Loading...</div>;
	else
		return (
			<Fragment>
				<FiltersContainer
					user={user}
					quizzes={showingQuizzes}
					changeQuizzes={changeQuizzes}
					topics={topics}
				/>
				<QuizzesContainer quizzes={showingQuizzes} user={user} {...props} />
			</Fragment>
		);
};

const mapStateToProps = ({ quizReducer }) => ({
	quizzes: quizReducer.quizzes,
	loading: quizReducer.loading,
	topics: quizReducer.topics,
});

export default connect(mapStateToProps, { fetchQuizzes, fetchTopics })(QuizzesPage);
