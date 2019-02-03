const { compose } = require('react-app-rewired');
const rewireStyledComponents = require('react-app-rewire-styled-components');
const rewireReactHotLoader = require('react-app-rewire-hot-loader');
const path = require('path');

module.exports = function override(config, env) {
	config.resolve = {
		alias: {
			app$: path.resolve(__dirname, 'src/App.js'),
			theme$: path.resolve(__dirname, 'src/Theme.js'),
			auth$: path.resolve(__dirname, 'src/Auth.js'),
			server$: path.resolve(__dirname, 'src/utils/server.js'),
			styles: path.resolve(__dirname, 'src/Styles'),
			pages: path.resolve(__dirname, 'src/pages'),
			containers: path.resolve(__dirname, 'src/containers'),
			components: path.resolve(__dirname, 'src/components'),
			assets: path.resolve(__dirname, 'src/assets'),
		},
	};
	config = rewireStyledComponents(config, env);
	return config;
};
