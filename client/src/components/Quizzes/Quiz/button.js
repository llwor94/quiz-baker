import React from 'react';
import styled from 'styled-components';

export const Button = ({ handleClick }) => {
	return <div onClick={handleClick}>Start Quiz</div>;
};
