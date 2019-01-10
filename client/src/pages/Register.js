import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import RegisterForm from '../containers/Register/RegisterForm';
import UploadImage from '../containers/Register/uploadImage';

const Register = ({ user, ...props }) => {
	if (!user) return <RegisterForm {...props} />;
	else return <UploadImage />;
};

const mapStateToProps = ({ authReducer }) => ({
	user: authReducer.user,
});

export default connect(mapStateToProps)(Register);
