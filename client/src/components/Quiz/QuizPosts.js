import React, { useEffect, useContext } from 'react';

import server from 'server';

import { AuthCtx } from 'auth';
import { QuizPostCtx, QuestionCtx } from 'containers/Quiz';
import { QuizCtx } from 'pages/Quiz';
import NewPost from '../Posts/NewPost';
import QuizPost from './QuizPost';

const QuizPosts = () => {
	const [ quiz, setQuiz ] = useContext(QuizCtx);
	const [ quizPosts, setQuizPosts ] = useContext(QuizPostCtx);
	const [ currentQuestion, setCurrentQuestion ] = useContext(QuestionCtx);
	const { user } = useContext(AuthCtx);
	useEffect(() => {
		server
			.get(`/quizzes/${quiz.id}/posts`)
			.then(({ data }) => {
				setQuizPosts(data.sort((a, b) => b.id - a.id));
			})
			.catch(err => console.log(err));
	}, []);

	if (!quizPosts) return <div>Loading..</div>;
	else
		return (
			<div style={{ width: '500px', marginTop: '15px' }}>
				{user && quiz.question_count === currentQuestion && <NewPost quiz={quiz} />}
				{quizPosts.length > 0 &&
					quizPosts.map(post => <QuizPost key={post.id} post={post} />)}
			</div>
		);
};

export default QuizPosts;
