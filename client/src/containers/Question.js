import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';

import { Question as QuestionWrapper } from '../components/Quizzes/Questions';
import { Button } from '../components/Quizzes/button';

const Question = ({ question, checkAnswer, ...props }) => {
	const [ selected, setSelected ] = useState(null);
	const checkQuestion = () => {
		checkAnswer(selected + 1);
		setSelected(null);
	};
	return (
		<Fragment>
			<QuestionWrapper
				question={question}
				handleChange={e => setSelected(e.value)}
				inputSelection={selected}
			/>
			<Button handleClick={checkQuestion} text='Take Quiz' />
		</Fragment>
	);
};

const mapStateToProps = ({ questionReducer }) => ({});

export default connect(mapStateToProps)(Question);
