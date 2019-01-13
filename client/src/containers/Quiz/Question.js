import React, { useState, Fragment } from 'react';
import server from '../../utils/server';

import { Question as QuestionWrapper } from '../../components/Quizzes/Questions';
import { Button } from '../../components/Quizzes/button';

const Question = ({ question, ...props }) => {
	const [ selected, setSelected ] = useState(null);
	console.log(selected);
	const checkAnswer = () => {
		let option = selected + 1;
		server
			.get(`quizzes/${props.quiz.id}/questions/${question.id}/response`, {
				params: { option },
			})
			.then(({ data }) => {
				let newQuestion = {
					correct: data.correct,
					question: question,
					option: question.options[selected],
				};

				props.handleAnswer(newQuestion);
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
			<Button handleClick={checkAnswer} text='Submit' disabled={selected === null} />
		</Fragment>
	);
};

export default Question;
