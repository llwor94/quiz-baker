import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import RegisterContainer from '../containers/Register';

const Register = ({ user, ...props }) => {
	return <RegisterContainer />;
};

const mapStateToProps = ({ authReducer }) => ({
	user: authReducer.user,
});

export default connect(mapStateToProps)(Register);
