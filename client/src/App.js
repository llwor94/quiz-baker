import React, { Component } from 'react';
import { createGlobalStyle } from 'styled-components';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import LoginContainer from './containers/Login';
import RegisterContainer from './containers/Register';
import DashboardContainer from './containers/Dashboard';

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

class App extends Component {
	render() {
		return (
			<div>
				<GlobalStyle />

				<Switch>
					<Route
						exact
						path='/'
						render={props => <DashboardContainer {...props} user={this.props.user} />}
					/>
					<Route path='/login' component={LoginContainer} />
					<Route path='/register' component={RegisterContainer} />
				</Switch>
			</div>
		);
	}
}

const mapStateToProps = ({ authReducer }) => ({
	user: authReducer.user,
});

export default connect(mapStateToProps)(App);
