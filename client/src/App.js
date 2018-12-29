import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import LoginContainer from './containers/Login';
import RegisterContainer from './containers/Register';
import DashboardContainer from './containers/Dashboard';
import ForumContainer from './containers/Forum';
import PostContainer from './containers/Post';
import QuizContainer from './containers/Quizzes';
import Header from './components/Header';

import { checkUser } from './store/actions/authActions';

import { DarkMode } from './Themes/dark';
import { LightMode } from './Themes/light';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
		box-sizing: border-box;
  }

	html, body {
		height: 100%;
		width: 100%;
		background-color: ${props => props.theme.main};
		color: ${props => props.theme.text}
	}
`;

const Wrapper = styled.div`
	width: 100%;
	padding: 125px 24px 20px;
	display: flex;
	justify-content: center;
`;

const App = ({ user, history, checkUser }) => {
	const [ darkMode, setValue ] = useState(false);
	useEffect(() => {
		checkUser();
	}, []);
	useEffect(
		() => {
			history.push('/');
		},
		[ user ],
	);
	return (
		<ThemeProvider theme={darkMode ? DarkMode : LightMode}>
			<div>
				<GlobalStyle />
				<Header user={user} setValue={setValue} darkMode={darkMode} />
				<Wrapper>
					<div style={{ width: '648px' }}>
						<Switch>
							<Route
								exact
								path='/'
								render={props => <DashboardContainer {...props} user={user} />}
							/>
							<Route exact path='/login' component={LoginContainer} />
							<Route exact path='/register' component={RegisterContainer} />
							<Route
								exact
								path='/forum'
								render={props => <ForumContainer {...props} user={user} />}
							/>
							<Route
								exact
								path='/quizzes'
								render={props => <QuizContainer {...props} user={user} />}
							/>
							<Route
								exact
								path='/forum/:id'
								render={props => <PostContainer {...props} user={user} />}
							/>
						</Switch>
					</div>
				</Wrapper>
			</div>
		</ThemeProvider>
	);
};

const mapStateToProps = ({ authReducer }) => ({
	user: authReducer.user,
});

export default withRouter(connect(mapStateToProps, { checkUser })(App));
