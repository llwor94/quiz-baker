import React, { useEffect, useState, useContext } from 'react';
import UserQuiz from '../components/Settings/UserQuiz';
import Quiz from '../components/Quizzes/Quiz';
import CreateQuiz from '../components/Settings/CreateQuiz';
import Sidebar from '../components/Settings/Sidebar';
import Loading from '../components/Styles/Loading';
import { UserQuizzesCtx, UserPostsCtx } from '../pages/Settings';
import { UserCtx } from '../App';
import NewPost from '../components/Posts/NewPost';
import Post from '../components/Posts/Post';
import Quizzes from '../components/Settings/Quizzes';
import Posts from '../components/Settings/Posts';
import { SettingsWrapper, Menu } from '../Styles/Settings/';
import server from '../utils/server';

const Settings = props => {
	const [ userQuizzes, setUserQuizzes ] = useContext(UserQuizzesCtx);
	const [ userPosts, setUserPosts ] = useContext(UserPostsCtx);
	const [ user, setUser ] = useContext(UserCtx);
	const [ activeTab, setActiveTab ] = useState('quizzes');
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

			server.get('/posts').then(({ data }) => {
				if (user) {
					setUserPosts(
						data
							.filter(post => post.author === user.username)
							.sort((a, b) => b.id - a.id),
					);
				}
			});
		},
		[ user ],
	);
	const tabs = [
		{ label: 'Your Quizzes', command: () => setActiveTab('quizzes') },
		{ label: 'Your Posts', command: () => setActiveTab('posts') },
	];
	console.log(activeTab);

	if (!userQuizzes || !userPosts) return <Loading />;
	else
		return (
			<SettingsWrapper>

				<div style={{ marginRight: '15px' }}>
					<div style={{display: 'flex', justifyContent: 'center', position: 'relative'}}>
						
					<Sidebar />
					<Menu model={tabs} style={{ width: '100%' }} />
					</div>
					{activeTab === 'quizzes' ? (
						<Quizzes {...props} />
					) : (
						<div>
							<Posts {...props} />
						</div>
					)};
				</div>
			</SettingsWrapper>
		);
};

export default Settings;
