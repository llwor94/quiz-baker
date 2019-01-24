import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from './Auth';

import App from './App';

const app = (
	<Router>
		<AuthProvider>
			<App />
		</AuthProvider>
	</Router>
);
ReactDOM.render(app, document.getElementById('root'));
