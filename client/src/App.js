import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import UserQuizPage from './pages/UserQuiz';
import UserQuizzesPage from './pages/UserQuizzes';
import QuizzesPage from './pages/Quizzes';
import QuizPage from './pages/Quiz';
import ForumPage from './pages/Forum';
import PostPage from './pages/Post';
import RegisterPage from './pages/Register';
import SettingsPage from './pages/Settings';
import LoginContainer from './containers/Login';

import Header from './components/Header';

import { checkUser } from './store/actions/authActions';

import { DarkMode } from './Themes/dark';
import { LightMode } from './Themes/light';

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
		color: ${props => props.theme.text}
	}
`;

const Wrapper = styled.div`
	width: 100%;
	padding: 125px 24px 20px;
	display: flex;
	justify-content: center;
`;

const App = ({ checkUser }) => {
	const [ darkMode, setValue ] = useState(false);
	useEffect(() => {
		checkUser();
	}, []);

	return (
		<ThemeProvider theme={darkMode ? DarkMode : LightMode}>
			<div>
				<GlobalStyle />
				<Header setValue={setValue} darkMode={darkMode} />
				<Wrapper>
					<div style={{ position: 'relative' }}>
						<Switch>
							<Route exact path='/login' component={LoginContainer} />
							<Route exact path='/register' component={RegisterPage} />
							<Route exact path='/forum' component={ForumPage} />
							<Route exact path={[ '/', '/quizzes' ]} component={QuizzesPage} />
							<Route exact path='/quizzes/user/:id' component={UserQuizzesPage} />
							<Route exact path='/quizzes/edit/:id' component={UserQuizPage} />
							<Route exact path='/quizzes/:id' component={QuizPage} />
							<Route exact path='/forum/:id' component={PostPage} />
							<Route exact path='/user/settings' component={SettingsPage} />
						</Switch>
					</div>
				</Wrapper>
			</div>
		</ThemeProvider>
	);
};

export default withRouter(connect(null, { checkUser })(App));
