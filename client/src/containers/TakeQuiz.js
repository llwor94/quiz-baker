import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';

import { fetchQuiz } from '../store/actions/quizActions';
import { fetchQuizQuestions } from '../store/actions/questionActions';
import { Quiz as QuizWrapper } from '../components/Quizzes/Quiz';

const Quiz = ({ quiz, loading, questions, fetchQuiz, fetchQuizQuestions, ...props }) => {
	useEffect(() => {
		fetchQuiz(props.match.params.id);
		fetchQuizQuestions(props.match.params.id);
	}, []);

	const [ currentQuestion, setQuestion ] = useState(null);

	if (quiz)
		return (
			<Fragment>
				<QuizWrapper quiz={quiz} />
				<button>Start quiz?</button>
			</Fragment>
		);
	else return <div>Loading...</div>;
};

const mapStateToProps = ({ quizReducer, questionReducer }) => ({
	quiz: quizReducer.quiz,
	loading: quizReducer.loading,
	questions: questionReducer.questions,
});

export default connect(mapStateToProps, { fetchQuiz, fetchQuizQuestions })(Quiz);
