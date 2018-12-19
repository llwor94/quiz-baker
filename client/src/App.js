import React, { Component } from 'react';
import { createGlobalStyle } from 'styled-components';

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
				<p>Hello World</p>
			</div>
		);
	}
}

export default App;
