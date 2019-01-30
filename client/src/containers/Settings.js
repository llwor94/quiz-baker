import React, { useEffect, useState, useContext } from 'react';
import Profile from '../components/Settings/Profile';
import Loading from '../components/Styles/Loading';
import { UserQuizzesCtx, UserPostsCtx } from '../pages/Settings';
import { AuthCtx } from '../Auth';

import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import Quizzes from '../components/Settings/Quizzes';
import Posts from '../components/Settings/Posts';
import { SettingsWrapper, Menu, NewMenu } from '../Styles/Settings/';
import RollingPinIcon from '../assets/rolling-pin';
import MediaQuery from 'react-responsive';
import server from '../utils/server';

const Settings = props => {
	const [ userQuizzes, setUserQuizzes ] = useContext(UserQuizzesCtx);
	const [ userPosts, setUserPosts ] = useContext(UserPostsCtx);
	const { user } = useContext(AuthCtx);
	const [ activeTab, setActiveTab ] = useState('quizzes');
	const [ windowWidth, setWindowWidth ] = useState(window.innerWidth);
	const [ sidebarShowing, setSidebarShowing ] = useState(false);

	useEffect(() => {
		if (windowWidth > 1500) {
			setSidebarShowing(true);
		}
		window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
	}, []);

	useEffect(
		() => {
			if (windowWidth > 1500) {
				setSidebarShowing(true);
			} else {
				setSidebarShowing(false);
			}
		},
		[ windowWidth ],
	);

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

	if (!userQuizzes || !userPosts) return <Loading />;
	else
		return (
			<SettingsWrapper>
				<div style={{ width: '100%' }}>
					<Button
						className={'sidebarButton'}
						icon='pi pi-bars'
						onClick={() => setSidebarShowing(true)}
						style={{ position: 'absolute', top: '65px', left: '10px' }}
					/>
					<Sidebar
						visible={sidebarShowing}
						onHide={() => setSidebarShowing(false)}
						modal={false}
						showCloseIcon={windowWidth < 1500}
					>
						<Profile setActiveTab={setActiveTab} activeTab={activeTab} />
					</Sidebar>
					<div className='inner'>
						<MediaQuery minWidth={800}>
							<NewMenu activeTab={activeTab} setActiveTab={setActiveTab} />
						</MediaQuery>
						<MediaQuery minWidth={950}>
							<RollingPinIcon className='rollingPin' />
						</MediaQuery>
					</div>
					{activeTab === 'quizzes' ? (
						<Quizzes {...props} />
					) : (
						<div>
							<Posts {...props} />
						</div>
					)}
					;
				</div>
			</SettingsWrapper>
		);
};

export default Settings;
