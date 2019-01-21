import React, { useEffect, useState, Fragment, useContext } from 'react';
import server from '../../utils/server';
import _ from 'lodash';
import { Growl } from 'primereact/growl';
import { Button, BackButton } from '../../Styles/Components/Button';
import { QuestionCtx } from '../../containers/Quiz';
import { QuizCtx } from '../../pages/Quiz';

import {
	SplashWrapper,
	SplashTitle,
	SplashHeader,
	SplashMidWrapper,
	SplashDescription,
	Fork,
	SplashFooter,
} from '../../Styles/Quiz/Splash';
import Question from './Question';
import forkIcon from '../../assets/fork.svg';

const Quiz = props => {
	const [ quiz, setQuiz ] = useContext(QuizCtx);
	const [ currentQuestion, setCurrentQuestion ] = useContext(QuestionCtx);
	console.log(quiz);
	return (
		<Fragment>
			<BackButton
				style={{ position: 'absolute', top: 8, right: 785, maxWidth: '200px' }}
				onClick={() => props.history.goBack()}
			/>
			<SplashWrapper>
				<div style={{ maxWidth: '600px' }}>
					<SplashTitle>{quiz.title}</SplashTitle>
					<SplashHeader>
						A <span className='topic'>{quiz.topic}</span> quiz by{' '}
						<span className='author'>{quiz.author.username}</span>{' '}
					</SplashHeader>
					<SplashMidWrapper>
						<div style={{ width: '500px' }}>
							<SplashDescription>Description:</SplashDescription>
							<div>{quiz.description}</div>
						</div>
						<Fork src={forkIcon} />
					</SplashMidWrapper>
					{quiz.time_limit_seconds && <div>This is a timed quiz.</div>}
					<SplashFooter>
						{' '}
						{quiz.question_count === 1 ? (
							<span>
								<span>This quiz has </span>
								<span className='questionCount'>
									{quiz.question_count} question{' '}
								</span>
							</span>
						) : (
							<span>
								<span>This quiz has </span>
								<span className='questionCount'>
									{quiz.question_count} questions{' '}
								</span>
							</span>
						)}
						{quiz.score ? (
							<span>
								and you got <span className='score'>{quiz.score}</span> right.
							</span>
						) : (
							<span>Hungry for knowledge?</span>
						)}
					</SplashFooter>
					<Button label='Take Quiz' onClick={() => setCurrentQuestion(0)} full />
				</div>
			</SplashWrapper>
		</Fragment>
	);
};

export default Quiz;
