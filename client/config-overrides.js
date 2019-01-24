const { compose } = require('react-app-rewired');
const rewireStyledComponents = require('react-app-rewire-styled-components');
const rewireReactHotLoader = require('react-app-rewire-hot-loader');

module.exports = function override(config, env) {
	const rewires = compose(rewireStyledComponents(), rewireReactHotLoader());
	return rewires(config, env);
};
