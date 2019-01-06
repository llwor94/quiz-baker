import React, { useState } from 'react';
import { connect } from 'react-redux';

import server from '../../utils/server';
import _ from 'lodash';

import { CreateNewQuiz, CreateQuizButton } from '../../components/Quizzes/Quiz/create';
import { fetchTopics, fetchUserQuizzes } from '../../store/actions/quizActions';
import QuizForm from '../../components/Quizzes/QuizForm';

const CreateQuiz = ({ fetchTopics, topics, fetchUserQuizzes, token, ...props }) => {
	const [ newQuiz, setNewQuiz ] = useState(false);
	const [ quiz, setQuiz ] = useState({ title: '', description: '', topic: '' });

	const handleCreateQuiz = () => {
		server
			.post('/quizzes', quiz)
			.then(response => {
				fetchUserQuizzes();
				setQuiz(_.mapValues(quiz, ''));
				setNewQuiz(false);
			})
			.catch(error => console.log(error));
	};

	if (!newQuiz) return <CreateQuizButton handleClick={() => setNewQuiz(true)} />;
	else
		return (
			<CreateNewQuiz
				buttonDisabled={!quiz.title || !quiz.topic}
				handleSubmit={handleCreateQuiz}
				quiz={quiz}
				handleClose={() => setNewQuiz(false)}
			>
				<QuizForm topics={topics} quiz={quiz} setQuiz={setQuiz} />
			</CreateNewQuiz>
		);
};

const mapStateToProps = ({ quizReducer, authReducer }) => ({
	loading: quizReducer.loading,
	topics: quizReducer.topics,
	error: quizReducer.error,
	token: authReducer.token,
});

export default connect(mapStateToProps, { fetchTopics, fetchUserQuizzes })(CreateQuiz);
