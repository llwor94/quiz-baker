import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';

import { Question as QuestionWrapper } from '../components/Quizzes/Questions';
import { Button } from '../components/Quizzes/Questions/button';

const Question = ({ question, checkAnswer, ...props }) => {
	console.log(question);
	const [ selected, setSelected ] = useState(null);
	const checkQuestion = () => {
		checkAnswer(selected + 1);
	};
	return (
		<Fragment>
			<QuestionWrapper
				question={question}
				handleChange={e => setSelected(e.value)}
				inputSelection={selected}
			/>
			<Button handleClick={checkQuestion} />
		</Fragment>
	);
};

const mapStateToProps = ({ questionReducer }) => ({});

export default connect(mapStateToProps)(Question);
