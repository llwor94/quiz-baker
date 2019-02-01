import React, { useState, useContext } from 'react';
import _ from 'lodash';
import anime from 'animejs';
import { Transition } from 'react-transition-group';
import MediaQuery from 'react-responsive';

import { QuestionCtx } from '../../containers/Quiz';
import { QuizCtx } from '../../pages/Quiz';

import { Button, BackButton } from '../../Styles/Components/Button';
import {
	SplashWrapper,
	SplashTitle,
	SplashHeader,
	SplashDescription,
	SplashFooter,
} from '../../Styles/Quiz/Splash';

import ForkIcon from '../../assets/fork';

const animateOut = wrapper => anime({ targets: wrapper, translateY: -200, opacity: 0 });

const Quiz = props => {
	const [ quiz, setQuiz ] = useContext(QuizCtx);
	const [ currentQuestion, setCurrentQuestion ] = useContext(QuestionCtx);
	const [ startOut, setStartOut ] = useState(false);

	return (
		<Transition
			in={startOut}
			timeout={400}
			onEnter={animateOut}
			onEntered={() => setCurrentQuestion(0)}
		>
			<SplashWrapper>
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
		</Transition>
	);
};

export default Quiz;
