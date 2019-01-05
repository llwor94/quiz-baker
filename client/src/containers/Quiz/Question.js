import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { Question as QuestionWrapper } from '../../components/Quizzes/Questions';
import { Button } from '../../components/Quizzes/button';

const Question = ({ question, handleAnswer, questionResponse, ...props }) => {
	console.log(question);
	const [ selected, setSelected ] = useState(null);

	const checkAnswer = () => {
		let option = selected + 1;
		axios({
			method: 'get',
			url: `https://lambda-study-app.herokuapp.com/api/quizzes/${props.quiz
				.id}/questions/${question.id}/response`,
			params: {
				option,
			},
		})
			.then(({ data }) => {
				console.log(data);
				let newQuestions = [ ...questionResponse ];
				newQuestions[props.currentQuestion] = {
					correct: data.correct,
					question: question,
					option: question.options[selected],
				};

				handleAnswer(newQuestions);
				setSelected(null);
			})
			.catch(err => console.log(err));
	};

	return (
		<Fragment>
			<QuestionWrapper
				question={question}
				handleChange={e => setSelected(e.value)}
				inputSelection={selected}
			/>
			<Button handleClick={checkAnswer} text='Submit' />
		</Fragment>
	);
};

const mapStateToProps = ({ questionReducer }) => ({});

export default connect(mapStateToProps)(Question);
