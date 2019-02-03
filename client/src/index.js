import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from 'auth';
import ColorProvider from 'theme';

import App from './App';

const app = (
	<Router>
		<AuthProvider>
			<ColorProvider>
				<App />
			</ColorProvider>
		</AuthProvider>
	</Router>
);

ReactDOM.render(app, document.getElementById('root'));
