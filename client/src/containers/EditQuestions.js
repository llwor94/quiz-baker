import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Questions } from '../components/Quizzes/Questions/edit';

const EditQuestions = ({ children, ...props }) => {};

const mapStateToProps = ({ quizReducer, questionReducer }) => ({
	loading: questionReducer.loading,
	error: questionReducer.error,
});

export default connect(mapStateToProps)(EditQuestions);
