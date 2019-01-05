import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

const EditQuestion = ({ ...props }) => {};

const mapStateToProps = ({ quizReducer, questionReducer }) => ({
	loading: questionReducer.loading,
	error: questionReducer.error,
});

export default connect(mapStateToProps)(EditQuestion);
