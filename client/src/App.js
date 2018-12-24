import React, { useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import LoginContainer from './containers/Login';
import RegisterContainer from './containers/Register';
import DashboardContainer from './containers/Dashboard';
import ForumContainer from './containers/Forum';
import Header from './components/Header';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
		box-sizing: border-box;
  }

	html, body {
		height: 100%;
		width: 100%;
	}
`;

const Wrapper = styled.div`padding-top: 90px;`;

const App = ({ user, history }) => {
	useEffect(
		() => {
			history.push('/');
		},
		[ user ],
	);
	return (
		<div>
			<GlobalStyle />
			<Header user={user} />
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
				</Switch>
			</Wrapper>
		</div>
	);
};

const mapStateToProps = ({ authReducer }) => ({
	user: authReducer.user,
});

export default withRouter(connect(mapStateToProps)(App));
