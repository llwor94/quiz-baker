import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Quiz } from '../components/Quizzes/Quiz';

const UserQuizzes = ({ ...props }) => {
	return (
		<div>
			<div />
		</div>
	);
};

const mapStateToProps = ({ quizReducer }) => ({
	userQuizzes: quizReducer.userQuizzes,
	loading: quizReducer.loading,
});

export default connect(mapStateToProps)(UserQuizzes);
