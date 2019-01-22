import React, { useEffect, useContext, Fragment } from 'react';
import { Growl } from 'primereact/growl';
import server from '../../utils/server';
import { UserCtx } from '../../App';
import { ResponseCtx, QuizCtx } from '../../pages/Quiz';
import {
	Wrapper,
	ResultWrapper,
	SideColor,
	InnerWrapper,
	NumberWrapper,
} from '../../Styles/Quiz/Results';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCookieBite, faCookie } from '@fortawesome/free-solid-svg-icons';

const Results = () => {
	const [ questionResponse, setQuestionReponse ] = useContext(ResponseCtx);
	const [ quiz, setQuiz ] = useContext(QuizCtx);
	const [ user, setUser ] = useContext(UserCtx);

	const growl = React.createRef();
	console.log(quiz);
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
		console.log(quiz.user_vote, val);
		if (user) {
			let user_vote;
			if (val === quiz.user_vote) {
				user_vote = 0;
			} else {
				user_vote = val;
			}
			console.log(user_vote);
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
			<div style={{ display: 'flex' }}>
				<i className='pi pi-share-alt' onClick={handleCopy} />
				{user && (
					<Fragment>
						<FontAwesomeIcon
							title='Take a bite out of that, Boogin'
							icon={quiz.favorite ? faCookieBite : faCookie}
							color={quiz.favorite ? '#875818' : '#b2b2b2'}
							style={{ cursor: 'pointer' }}
							onClick={handleFavoriteToggle}
						/>
						<i
							className='pi pi-chevron-up'
							style={{
								color: quiz.user_vote === 1 ? '#DC758F' : !user ? 'gray' : 'black',
							}}
							onClick={() => handleVote(1)}
						/>
						<p
							style={{
								color: quiz.user_vote
									? quiz.user_vote === 1 ? '#DC758F' : '#E3D3E4'
									: 'black',
							}}
						>
							{quiz.votes}
						</p>
						<i
							className='pi pi-chevron-down'
							style={{
								color: quiz.user_vote === -1 ? '#E3D3E4' : !user ? 'gray' : 'black',
							}}
							onClick={() => handleVote(-1)}
						/>{' '}
					</Fragment>
				)}
			</div>
			<NumberWrapper>
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
					)}%
				</h3>
			</NumberWrapper>
		</Fragment>
	);
};

export default Results;
