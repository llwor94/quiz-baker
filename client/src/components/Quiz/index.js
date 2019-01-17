import React, { useEffect, useState, Fragment, useContext } from 'react';
import server from '../../utils/server';
import _ from 'lodash';
import { Growl } from 'primereact/growl';
import { Button } from '../../Styles/Components/Button';
import { QuestionCtx } from '../../containers/Quiz';
import { QuizCtx } from '../../pages/Quiz';

const Quiz = () => {
	const [ quiz, setQuiz ] = useContext(QuizCtx);
	const [ currentQuestion, setCurrentQuestion ] = useContext(QuestionCtx);

	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<div style={{ width: '500px' }}>
				<div>{quiz.title}</div>
				<Button label='Take Quiz' onClick={() => setCurrentQuestion(0)} full />
			</div>
		</div>
	);
};

export default Quiz;
