import React, { useEffect, useContext, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCookieBite, faCookie } from '@fortawesome/free-solid-svg-icons';

import server from '../../utils/server';

import { AuthCtx } from '../../Auth';
import { ResponseCtx, QuizCtx } from '../../pages/Quiz';

import {
	Wrapper,
	ResultWrapper,
	SideColor,
	InnerWrapper,
	NumberWrapper,
	FooterWrapper,
} from '../../Styles/Quiz/Results';
import { Growl } from '../../Styles/Components/Growl';

const Results = () => {
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
								/>{' '}
							</div>
							<i className='pi pi-share-alt' onClick={handleCopy} />
							<span>Share</span>
							<FontAwesomeIcon
								title='Take a bite out of that, Boogin'
								icon={quiz.favorite ? faCookieBite : faCookie}
								color={quiz.favorite ? '#875818' : '#b2b2b2'}
								style={{ cursor: 'pointer', height: '30px', width: '30px' }}
								onClick={handleFavoriteToggle}
							/>
							<span>Favorite</span>
						</div>
					</Fragment>
				)}
			</FooterWrapper>
		</Fragment>
	);
};

export default Results;
