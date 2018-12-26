import React, { useState } from 'react';
import { connect } from 'react-redux';

const Quizzes = ({ quizzes, loading, ...props }) => {
	if (loading) return <div>Loading...</div>;
	else if (quizzes)
		return (
			<div>
				{quizzes.map(quiz => (
					<div>
						<h1>{quiz.title}</h1>
					</div>
				))}
			</div>
		);
	else
		return (
			<div>
				<button>Click me</button>
			</div>
		);
};

const mapStateToProps = ({ quizReducer }) => ({
	quizzes: quizReducer.quizzes,
	loading: quizReducer.loading,
});

export default connect(mapStateToProps)(Quizzes);
