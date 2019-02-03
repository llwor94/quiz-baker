import React, { useState, useContext, useEffect } from 'react';
import _ from 'lodash';
import anime from 'animejs';
import { Transition } from 'react-transition-group';
import MediaQuery from 'react-responsive';

import { QuestionCtx } from 'containers/Quiz';
import { QuizCtx } from 'pages/Quiz';

import { Button, BackButton } from 'styles/Components/Button';
import {
	SplashWrapper,
	SplashTitle,
	SplashHeader,
	SplashDescription,
	SplashFooter,
} from 'styles/Quiz/Splash';

import ForkIcon from 'assets/fork';

const Quiz = props => {
	const [ quiz, setQuiz ] = useContext(QuizCtx);
	const [ currentQuestion, setCurrentQuestion ] = useContext(QuestionCtx);
	const [ startOut, setStartOut ] = useState(false);

	useEffect(
		() => {
			if (startOut) {
				anime({
					targets: '.wrapper',
					translateY: -200,
					opacity: 0,
					duration: 100,
					complete: () => setCurrentQuestion(0),
				});
			}
		},
		[ startOut ],
	);

	return (
		<SplashWrapper className='wrapper'>
			<MediaQuery minWidth={800}>
				<BackButton className='back-btn' onClick={() => props.history.goBack()} />
			</MediaQuery>
			<div className='inner'>
				<div className='body'>
					<SplashTitle>{quiz.title}</SplashTitle>
					<SplashHeader>
						A <span className='topic'>{quiz.topic}</span> quiz by{' '}
						<span className='author'>{quiz.author.username}</span>{' '}
					</SplashHeader>

					<div>
						<SplashDescription>Description:</SplashDescription>
						<span>{quiz.description}</span>
					</div>
				</div>
				<ForkIcon />
			</div>
			{quiz.question_time_limit ? (
				<div className='timed'>
					This is a timed quiz. <i className='pi pi-clock' />
				</div>
			) : (
				<div className='notTimed' />
			)}
			<SplashFooter>
				{' '}
				{quiz.question_count === 1 ? (
					<span>
						<span>This quiz has </span>
						<span className='questionCount'>{quiz.question_count} question </span>
					</span>
				) : (
					<span>
						<span>This quiz has </span>
						<span className='questionCount'>{quiz.question_count} questions </span>
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
			<Button label='Take Quiz' onClick={() => setStartOut(true)} full />
		</SplashWrapper>
	);
};

export default Quiz;
