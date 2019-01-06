import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import server from '../../utils/server';

import { fetchQuizzes } from '../../store/actions/quizActions';
import { fetchQuestion } from '../../store/actions/questionActions';
import { Quiz } from '../../components/Quizzes/Quiz';

const Quizzes = ({ quizzes, user, fetchQuizzes, ...props }) => {
	const handleFavoriteToggle = quiz => {
		server
			.patch(`quizzes/${quiz.id}`, { favorite: !quiz.favorite })
			.then(({ data }) => {
				console.log(data);
				fetchQuizzes();
			})
			.catch(err => console.log(err));
	};

	const handleUserVote = (quiz, val) => {
		console.log(quiz, val);
		let user_vote;
		if (val === quiz.user_vote) {
			user_vote = 0;
		} else {
			user_vote = val;
		}
		server
			.patch(`quizzes/${quiz.id}`, { vote: user_vote })
			.then(({ data }) => {
				console.log(data);
				fetchQuizzes();
			})
			.catch(err => console.log(err));
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
					handleVote={val => handleUserVote(quiz, val)}
				/>
			))}
		</Fragment>
	);
};

export default connect(null, { fetchQuestion, fetchQuizzes })(Quizzes);
