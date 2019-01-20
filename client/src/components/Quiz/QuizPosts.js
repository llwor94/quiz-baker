import React, { useEffect, useState, useContext } from 'react';

import { UserCtx } from '../../App';
import { QuizPostCtx, QuestionCtx } from '../../containers/Quiz';
import NewPost from '../Posts/NewPost';
import server from '../../utils/server';
import QuizPost from './QuizPost';

const QuizPosts = ({ quiz }) => {
	const [ quizPosts, setQuizPosts ] = useContext(QuizPostCtx);
	const [ currentQuestion, setCurrentQuestion ] = useContext(QuestionCtx);

	useEffect(() => {
		server
			.get(`/quizzes/${quiz.id}/posts`)
			.then(({ data }) => {
				setQuizPosts(data.sort((a, b) => b.id - a.id));
			})
			.catch(err => console.log(err));
	}, []);
	console.log(quizPosts);
	if (!quizPosts) return <div>Loading..</div>;
	else
		return (
			<div style={{ width: '500px', marginTop: '15px' }}>
				{quiz.questions.length === currentQuestion && <NewPost quiz={quiz} />}
				{quizPosts.length ? (
					quizPosts.map(post => <QuizPost key={post.id} post={post} />)
				) : (
					<div>This quiz doesn't have any posts yet.</div>
				)}
			</div>
		);
};

export default QuizPosts;
