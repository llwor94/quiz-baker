import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import server from '../../utils/server';

import { fetchQuizzes } from '../../store/actions/quizActions';

import { Quiz, QuizzesContainer } from '../../components/Quizzes/Quiz';

const Quizzes = ({ quizzes, user, fetchQuizzes, ...props }) => {
	const handleFavoriteToggle = quiz => {
		server
			.patch(`quizzes/${quiz.id}`, { favorite: !quiz.favorite })
			.then(({ data }) => {
				fetchQuizzes();
			})
			.catch(err => console.log(err));
	};

	const handleUserVote = (quiz, val) => {
		let user_vote;
		if (val === quiz.user_vote) {
			user_vote = 0;
		} else {
			user_vote = val;
		}
		server
			.patch(`quizzes/${quiz.id}`, { vote: user_vote })
			.then(({ data }) => {
				fetchQuizzes();
			})
			.catch(err => console.log(err));
	};

	const pushQuiz = id => {
		props.history.push(`quizzes/${id}`);
	};

	return (
		<QuizzesContainer>
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
		</QuizzesContainer>
	);
};
const mapStateToProps = ({ authReducer }) => ({
	user: authReducer.user,
});

export default connect(mapStateToProps, { fetchQuizzes })(Quizzes);
