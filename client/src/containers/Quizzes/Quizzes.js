import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';

import { fetchQuizzes, updateUserFavorite } from '../../store/actions/quizActions';
import { fetchQuestion } from '../../store/actions/questionActions';
import { Quiz } from '../../components/Quizzes/Quiz';

const Quizzes = ({ quizzes, user, ...props }) => {
	const handleFavoriteToggle = quiz => {
		updateUserFavorite(!quiz.favorite, quiz.id);
	};

	const handleStartQuiz = quiz => {
		fetchQuestion(quiz.id);
	};

	const pushQuiz = id => {
		props.history.push(`quizzes/${id}`);
	};

	return (
		<Fragment>
			{quizzes.map(quiz => (
				<Quiz
					key={quiz.id}
					quiz={quiz}
					user={user}
					handleClick={() => pushQuiz(quiz.id)}
					mainPage={true}
					handleFavoriteToggle={() => handleFavoriteToggle(quiz)}
					handleStartQuiz={() => handleStartQuiz(quiz)}
				/>
			))}
		</Fragment>
	);
};

export default connect(null, { updateUserFavorite, fetchQuestion })(Quizzes);
