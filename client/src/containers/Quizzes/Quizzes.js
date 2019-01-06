import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { fetchQuizzes, updateUserFavorite } from '../../store/actions/quizActions';
import { fetchQuestion } from '../../store/actions/questionActions';
import { Quiz } from '../../components/Quizzes/Quiz';

const Quizzes = ({ quizzes, user, token, fetchQuizzes, updateUserFavorite, ...props }) => {
	const handleFavoriteToggle = quiz => {
		updateUserFavorite(!quiz.favorite, quiz.id);
	};

	const handleUserVote = (quiz, val) => {
		console.log(quiz, val);
		let user_vote;
		if (val === quiz.user_vote) {
			user_vote = 0;
		} else {
			user_vote = val;
		}
		axios({
			method: 'patch',
			url: `https://lambda-study-app.herokuapp.com/api/quizzes/${quiz.id}`,
			headers: {
				authorization: token,
			},
			data: { vote: user_vote },
		})
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

const mapStateToProps = ({ authReducer }) => ({
	token: authReducer.token,
});

export default connect(mapStateToProps, { updateUserFavorite, fetchQuestion, fetchQuizzes })(
	Quizzes,
);
