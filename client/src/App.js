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
import Header from './components/Header';

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

const Wrapper = styled.div`padding-top: 105px;`;

const App = ({ user, history }) => {
	const [ darkMode, setValue ] = useState(false);
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
							path='/forum/:id'
							render={props => <PostContainer {...props} user={user} />}
						/>
					</Switch>
				</Wrapper>
			</div>
		</ThemeProvider>
	);
};

const mapStateToProps = ({ authReducer }) => ({
	user: authReducer.user,
});

export default withRouter(connect(mapStateToProps)(App));
