import React, { useEffect, useContext, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

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
import Header from 'components/Header';
import Footer from 'components/Footer';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
		box-sizing: border-box;
		font-family: 'Raleway', sans-serif;
  }
	

	html, body {
		height: 100%;
		width: 100%;
		background-color: ${props => props.theme.secondary};
		font-size: 12px;
		
		p, a, div {
		color: ${props => props.theme.text};
	}
	}
	
`;

export const Wrapper = styled.div`
	width: 100%;
	min-height: calc(100vh - 50px);
	background-color: ${props => props.theme.secondary};
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23acadae' fill-opacity='0.14'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
`;

export const InnerWrapper = styled.div`
	display: flex;
	justify-content: center;
	position: relative;
`;

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
				<GlobalStyle />
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
