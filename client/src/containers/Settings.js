import React, { useEffect, useState, useContext } from 'react';
import UserQuiz from '../components/Settings/UserQuiz';
import CreateQuiz from '../components/Settings/CreateQuiz';
import Sidebar from '../components/Settings/Sidebar';
import Loading from '../components/Styles/Loading';
import { UserQuizzesCtx } from '../pages/Settings';
import { UserCtx } from '../App';
import server from '../utils/server';
const Settings = () => {
	const [ userQuizzes, setUserQuizzes ] = useContext(UserQuizzesCtx);
	const [ user, setUser ] = useContext(UserCtx);
	useEffect(
		() => {
			server.get('/quizzes').then(({ data }) => {
				if (user) {
					setUserQuizzes(
						data
							.filter(quiz => quiz.author === user.username)
							.sort((a, b) => b.id - a.id),
					);
				}
			});
		},
		[ user ],
	);

	console.log(userQuizzes);

	if (!userQuizzes) return <Loading />;
	else
		return (
			<div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
				<Sidebar />
				<div style={{ width: '500px' }}>
					<CreateQuiz />
					{userQuizzes.map(quiz => <UserQuiz key={quiz.id} quiz={quiz} />)}
				</div>
			</div>
		);
};

export default Settings;
