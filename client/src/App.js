import React, { useEffect, useState, createContext, useContext, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { AuthCtx } from './Auth';

import QuizzesPage from './pages/Quizzes';
import QuizPage from './pages/Quiz';
import ForumPage from './pages/Forum';
import PostPage from './pages/Post';
import RegisterPage from './pages/Register';
import SettingsPage from './pages/Settings';
import UserQuizPage from './pages/UserQuiz';
import LoginContainer from './containers/Login';

import Loading from './components/Loading';
import Header from './components/Header';
import Footer from './components/Footer';

import { Wrapper, InnerWrapper } from './Theme';

const App = () => {
	const { user, login, logout } = useContext(AuthCtx);

	useEffect(() => {
		let data = JSON.parse(localStorage.getItem('user'));
		if (data) {
			login(data);
		} else {
			logout();
		}
	}, []);

	if (user === undefined) return <Loading />;
	else
		return (
			<Fragment>
				<Header />
				<Wrapper>
					<InnerWrapper>
						<Switch>
							<Route exact path='/' render={() => <Redirect to='/quizzes' />} />
							<Route exact path='/login' component={LoginContainer} />
							<Route exact path='/register' component={RegisterPage} />
							<Route exact path='/forum' component={ForumPage} />
							<Route exact path='/quizzes' component={QuizzesPage} />
							<Route exact path='/quizzes/:id' component={QuizPage} />
							<Route exact path='/forum/:id' component={PostPage} />
							<Route exact path='/user/settings' component={SettingsPage} />
							<Route exact path='/user/quizzes/:id' component={UserQuizPage} />
						</Switch>
					</InnerWrapper>
				</Wrapper>
				<Footer />
			</Fragment>
		);
};

export default App;
