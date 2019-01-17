import React, { useEffect, useContext, Fragment } from 'react';
import { Growl } from 'primereact/growl';
import server from '../../utils/server';
import { ResponseCtx, QuizCtx } from '../../pages/Quiz';
import {
	Wrapper,
	ResultWrapper,
	SideColor,
	InnerWrapper,
	NumberWrapper,
} from '../../Styles/Quiz/Results';

const Results = () => {
	const [ questionResponse, setQuestionReponse ] = useContext(ResponseCtx);
	const [ quiz, setQuiz ] = useContext(QuizCtx);
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
				<div onClick={handleCopy}>Share</div>
				<div onClick={handleFavoriteToggle}>Is favorited: {quiz.favorite}</div>
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
