import React, { useEffect, useState, createContext } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';

import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import QuizzesPage from './pages/Quizzes';
import QuizPage from './pages/Quiz';
import ForumPage from './pages/Forum';
import PostPage from './pages/Post';
import RegisterPage from './pages/Register';
import SettingsPage from './pages/Settings';
import UserQuizPage from './pages/UserQuiz';
import LoginContainer from './containers/Login';

import Header from './components/Header';
import Footer from './components/Footer';
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

const Wrapper = styled.div`width: 100%;`;

const InnerWrapper = styled.div`
	display: flex;
	justify-content: center;
	position: relative;
`;
export const UserCtx = createContext([ undefined, () => {} ]);
export const ColorCtx = createContext([ undefined, () => {} ]);

const App = () => {
	const [ darkMode, setValue ] = useState(false);
	const [ user, setUser ] = useState(undefined);

	return (
		<ColorCtx.Provider value={[ darkMode, setValue ]}>
			<ThemeProvider theme={darkMode ? DarkMode : LightMode}>
				<UserCtx.Provider value={[ user, setUser ]}>
					<div>
						<GlobalStyle />
						<Header setValue={setValue} darkMode={darkMode} />
						<Wrapper>
							<InnerWrapper>
								<Switch>
									<Route
										exact
										path='/'
										render={() => <Redirect to='/quizzes' />}
									/>
									<Route exact path='/login' component={LoginContainer} />
									<Route exact path='/register' component={RegisterPage} />
									<Route exact path='/forum' component={ForumPage} />
									<Route exact path='/quizzes' component={QuizzesPage} />
									<Route exact path='/quizzes/:id' component={QuizPage} />
									<Route exact path='/forum/:id' component={PostPage} />
									<Route exact path='/user/settings' component={SettingsPage} />
									<Route
										exact
										path='/user/quizzes/:id'
										component={UserQuizPage}
									/>
								</Switch>
							</InnerWrapper>
						</Wrapper>
						<Footer />
					</div>
				</UserCtx.Provider>
			</ThemeProvider>
		</ColorCtx.Provider>
	);
};

export default withRouter(App);
