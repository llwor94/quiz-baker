import React, { useEffect, useContext } from 'react';
import MediaQuery from 'react-responsive';
import server from 'server';

import { AuthCtx } from 'auth';
import { QuizzesCtx } from 'pages/Quizzes';

import Loading from 'components/Loading';
import Quiz from 'components/Quizzes/Quiz';
import Sort from 'components/Quizzes/Sort';
import Filter from 'components/Quizzes/Filter';
import Topics from 'components/Quizzes/Topics';

import { Wrapper } from 'styles/Quizzes';

const Quizzes = props => {
	const [ quizzes, setQuizzes ] = useContext(QuizzesCtx);
	const { user } = useContext(AuthCtx);
	useEffect(() => {
		server
			.get('/quizzes')
			.then(({ data }) => {
				setQuizzes(data.filter(quiz => quiz.question_count).sort((a, b) => b.id - a.id));
			})
			.catch(err => console.log(err));
	}, []);

	useEffect(
		() => {
			server
				.get('/quizzes')
				.then(({ data }) => {
					setQuizzes(
						data.filter(quiz => quiz.question_count).sort((a, b) => b.id - a.id),
					);
				})
				.catch(err => console.log(err));
		},
		[ user ],
	);

	if (!quizzes) return <Loading />;
	else
		return (
			<Wrapper>
				<MediaQuery minWidth={500}>
					<div className='filters'>
						<Sort />
						<div style={{ display: 'flex' }}>
							<Topics />
							<Filter />
						</div>
					</div>
				</MediaQuery>
				<div className='quizzes'>
					{quizzes.map(quiz => <Quiz key={quiz.id} quiz={quiz} {...props} />)}
				</div>
			</Wrapper>
		);
};

export default Quizzes;
