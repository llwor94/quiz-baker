import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import React, { useEffect, useState, createContext, Fragment } from 'react';

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
	

	html, body{
		height: 100%;
		width: 100%;
		background-color: ${props => props.theme.secondary};
		color: ${props => props.theme.text};
	}
`;

// const Wrapper = styled.div`
// 	width: 100%;
// 	min-height: calc(100vh - 50px);
// 	background-color: #ffffff;
// 	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23acadae' fill-opacity='0.2'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
// `;


const Wrapper = styled.div`
background-color: #ffffff;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cg fill='%23878787' fill-opacity='0.07'%3E%3Cpolygon fill-rule='evenodd' points='8 4 12 6 8 8 6 12 4 8 0 6 4 4 6 0 8 4'/%3E%3C/g%3E%3C/svg%3E");`;

const InnerWrapper = styled.div`
	display: flex;
	justify-content: center;
	position: relative;
`;

// const AllButFooter = styled.div`
//   min-height: 100%;
//   margin-bottom: -146px;
//   &:after {
//     content: "";
//     display: block;
// 	height: 146px;
//   }
// `;
export const UserCtx = createContext([ undefined, () => {} ]);
export const ColorCtx = createContext([ undefined, () => {} ]);

const App = () => {
	const [ darkMode, setValue ] = useState(false);
	const [ user, setUser ] = useState(undefined);

	return (
		<ColorCtx.Provider value={[ darkMode, setValue ]}>
			<ThemeProvider theme={darkMode ? DarkMode : LightMode}>
				<UserCtx.Provider value={[ user, setUser ]}>
					<Fragment>
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
					</Fragment>
				</UserCtx.Provider>
			</ThemeProvider>
		</ColorCtx.Provider>
	);
};

export default withRouter(App);
