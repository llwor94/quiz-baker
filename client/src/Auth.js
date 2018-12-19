import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// const AuthWrapper = ({loggedIn, user}) => {
// 	useEffect(() => {

// 	})
// }
class AuthWrapper extends Component {
	state = {
		loggedIn: false,
		user: {},
	};

	render() {
		return <Fragment>{this.props.render(this.props.loggedIn)}</Fragment>;
	}
}

const mapStateToProps = ({ authReducer }) => ({
	loggedIn: authReducer.loggedIn,
	user: authReducer.user,
});

export default connect(mapStateToProps)(AuthWrapper);
