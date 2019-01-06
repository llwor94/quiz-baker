import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import server from '../../utils/server';

import { fetchQuizForEdit, fetchTopics } from '../../store/actions/quizActions';
import { EditUserQuiz } from '../../components/Quizzes/Quiz/edit';
import QuizForm from '../../components/Quizzes/QuizForm';
import _ from 'lodash';

const Quiz = ({ topics, ...props }) => {
	const [ quiz, setQuiz ] = useState({ title: '', description: '', topic: '' });

	const [ edit, setEdit ] = useState(false);

	useEffect(() => {
		setQuiz(_.pick(props.quiz, [ 'title', 'description', 'topic' ]));
	}, []);

	useEffect(
		() => {
			setQuiz(_.pick(props.quiz, [ 'title', 'description', 'topic' ]));
			setEdit(false);
		},
		[ props.quiz ],
	);

	const handleQuizEdit = () => {
		if (!edit) setEdit(true);
		else {
			if (!_.isEqual(quiz, _.pick(props.quiz, [ 'title', 'description', 'topic' ]))) {
				server
					.patch(`quizzes/${props.quiz.id}/edit`, quiz)
					.then(response => {
						console.log(response);
						fetchQuizForEdit(props.quiz.id);
						setEdit(false);
					})
					.catch(err => console.log(err));
			}
		}
	};

	return (
		<EditUserQuiz quiz={quiz} edit={edit} handleClick={handleQuizEdit} loading={props.loading}>
			<QuizForm topics={topics} quiz={quiz} setQuiz={setQuiz} />
		</EditUserQuiz>
	);
};

const mapStateToProps = ({ quizReducer }) => ({
	quiz: quizReducer.edittingQuiz,
	loading: quizReducer.loading,
	error: quizReducer.error,
	topics: quizReducer.topics,
});

export default connect(mapStateToProps, {
	fetchQuizForEdit,
	fetchTopics,
})(Quiz);
