import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';

import { fetchQuizzes, fetchTopics } from '../store/actions/quizActions';

import FiltersContainer from '../containers/Quizzes/Filters/';
import QuizzesContainer from '../containers/Quizzes/Quizzes';
import Loading from '../components/Styles/Loading';

const QuizzesPage = ({ quizzes, loading, fetchQuizzes, fetchTopics, topics, ...props }) => {
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

	if (!showingQuizzes || !topics) return <Loading />;
	else
		return (
			<Fragment>
				<FiltersContainer
					quizzes={showingQuizzes}
					changeQuizzes={changeQuizzes}
					topics={topics}
				/>
				<QuizzesContainer quizzes={showingQuizzes} {...props} />
			</Fragment>
		);
};

const mapStateToProps = ({ quizReducer }) => ({
	quizzes: quizReducer.quizzes,
	loading: quizReducer.loading,
	topics: quizReducer.topics,
});

export default connect(mapStateToProps, { fetchQuizzes, fetchTopics })(QuizzesPage);
