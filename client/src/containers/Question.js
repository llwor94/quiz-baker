import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';

import { Question as QuestionWrapper } from '../components/Quizzes/Questions';
import { Button } from '../components/Quizzes/Questions/button';

const Question = ({ question, ...props }) => {
	const checkQuestion = () => {};
	return (
		<Fragment>
			<QuestionWrapper question={question} />
			<Button handleClick={checkQuestion} />
		</Fragment>
	);
};

const mapStateToProps = ({ questionReducer }) => ({});

export default connect(mapStateToProps)(Question);
