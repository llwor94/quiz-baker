import React from 'react';
import styled from 'styled-components';

export const Button = ({ currentQuestion, handleClick }) => {
	console.log(currentQuestion);
	return (
		<div onClick={handleClick}>
			{currentQuestion === null ? 'Start Quiz?' : 'Next Question'}
		</div>
	);
};
