import React, { useEffect, useContext, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCookieBite, faCookie } from '@fortawesome/free-solid-svg-icons';
import anime from 'animejs';
import { withTheme } from 'styled-components';
import server from 'server';

import { AuthCtx } from 'auth';
import { ResponseCtx, QuizCtx } from 'pages/Quiz';

import QuestionTracker from './QuestionTracker';

import {
	Wrapper,
	ResultWrapper,
	SideColor,
	InnerWrapper,
	NumberWrapper,
	FooterWrapper,
} from 'styles/Quiz/Results';
import { Growl } from 'styles/Components/Growl';

const Results = props => {
	const [ questionResponse, setQuestionReponse ] = useContext(ResponseCtx);
	const [ quiz, setQuiz ] = useContext(QuizCtx);
	const { user } = useContext(AuthCtx);

	const growl = React.createRef();

	useEffect(() => {
		let score = questionResponse.filter(result => result.correct).length;
		if (score > quiz.score) {
			server
				.patch(`quizzes/${quiz.id}`, { score: score })
				.then(({ data }) => console.log(data))
				.catch(err => console.log(err));
		}
	}, []);

	const handleCopy = () => {
		let value = `http://localhost:3000/quizzes/${quiz.id}`;
		navigator.clipboard.writeText(value).then(() => {
			growl.current.show({ severity: 'info', summary: 'Link Copied!' });
		});
	};

	const handleFavoriteToggle = () => {
		server
			.patch(`quizzes/${quiz.id}`, { favorite: !quiz.favorite })
			.then(({ data }) => {
				server.get(`/quizzes/${quiz.id}`).then(({ data }) => {
					setQuiz(data);
				});
			})
			.catch(err => console.log(err));
	};

	const handleVote = val => {
		if (user) {
			let user_vote;
			if (val === quiz.user_vote) {
				user_vote = 0;
			} else {
				user_vote = val;
			}
			server
				.patch(`quizzes/${quiz.id}`, { vote: user_vote })
				.then(({ data }) => {
					server.get(`/quizzes/${quiz.id}`).then(({ data }) => {
						setQuiz(data);
					});
				})
				.catch(err => console.log(err));
		}
	};

	const animateIn = e => {
		let name = e.target.getAttribute('name');
		anime({
			targets: `.icon-wrapper .${name}`,
			color: props.theme.aqua,
			easing: 'easeInQuad',
			scale: 1.1,
			duration: 50,
		});
	};

	const animateOut = e => {
		let name = e.target.getAttribute('name');
		anime({
			targets: `.icon-wrapper .${name}`,
			color: props.theme.link,
			easing: 'easeOutQuad',
			scale: 1,
			duration: 100,
		});
	};

	const animateFavoriteIn = e => {
		console.log(e.target);
		let name = e.target.getAttribute('name');
		anime({
			targets: `.icon-wrapper .favorite`,

			color: props.theme.aqua,
			easing: 'easeInQuad',
			scale: 1.1,
			duration: 50,
		});
	};

	const animateFavoriteOut = e => {
		console.log(e.target);
		let name = e.target.getAttribute('name');

		anime({
			targets: `.icon-wrapper .favorite`,
			color: quiz.favorite ? '#875818' : props.theme.link,
			easing: 'easeInQuad',
			scale: 1,
			duration: 100,
		});
	};

	return (
		<Fragment>
			<Growl ref={growl} />
			<Wrapper>
				{questionResponse.map(result => (
					<ResultWrapper>
						<SideColor correct={result.correct} />
						<InnerWrapper>
							<h3>{result.question.question}</h3>
							<p>{result.option}</p>
						</InnerWrapper>
					</ResultWrapper>
				))}
			</Wrapper>
			<NumberWrapper>
				<div>Your Results:</div>
				<h3>
					{questionResponse.filter(result => result.correct).length} /{' '}
					{questionResponse.length}
				</h3>{' '}
				<span>|</span>
				<h3>
					{Math.floor(
						questionResponse.filter(result => result.correct).length /
							questionResponse.length *
							100,
					)}
					%
				</h3>
			</NumberWrapper>
			<QuestionTracker />
			<FooterWrapper>
				{user && (
					<Fragment>
						<div className='vert'>
							<div className='vote' style={{ textAlign: 'center' }}>
								<i
									className='pi pi-chevron-up'
									style={{
										color: quiz.user_vote === 1 && '#DC758F',
									}}
									onClick={() => handleVote(1)}
								/>
								<p
									style={{
										color:
											quiz.user_vote === 1
												? '#DC758F'
												: quiz.user_vote === -1 && '#E3D3E4',
									}}
								>
									{quiz.votes}
								</p>
								<i
									className='pi pi-chevron-down'
									style={{
										color: quiz.user_vote === -1 && '#E3D3E4',
									}}
									onClick={() => handleVote(-1)}
									onMouseEnter={animateOut}
								/>{' '}
							</div>
							<div name='favorite' className='icon-wrapper'>
								<FontAwesomeIcon
									name='favorite'
									className='favorite'
									title='Take a bite out of that, Boogin'
									icon={quiz.favorite ? faCookieBite : faCookie}
									style={{
										cursor: 'pointer',
										height: '21px',
										width: '21px',
										color: quiz.favorite && '#875818',
									}}
									onClick={handleFavoriteToggle}
									onMouseEnter={animateFavoriteIn}
									onMouseLeave={animateFavoriteOut}
								/>
								<span className='icon-label favorite'>Favorite</span>
							</div>
							<div name='share' className='icon-wrapper'>
								<i
									className='pi pi-share-alt share'
									name='share'
									onClick={handleCopy}
									onMouseEnter={animateIn}
									onMouseLeave={animateOut}
								/>
								<span name='share' className='share'>
									Share
								</span>
							</div>
							<div name='comment-icon' className='icon-wrapper'>
								<i
									className='pi pi-comment comment-icon'
									name='comment-icon'
									onMouseEnter={animateIn}
									onMouseLeave={animateOut}
									onClick={() => props.setNewComment(true)}
								/>
								<span className='icon-label comment-icon'>Comment</span>
							</div>
						</div>
					</Fragment>
				)}
			</FooterWrapper>
		</Fragment>
	);
};

export default withTheme(Results);
