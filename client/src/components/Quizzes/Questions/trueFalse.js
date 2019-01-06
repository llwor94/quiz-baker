import React from 'react';
import styled from 'styled-components';

import { RadioButton } from 'primereact/radiobutton';

const Wrapper = styled.div`
	width: 50%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding-bottom: 10px;
`;

const InputWrapper = styled.div`padding: 5px 0;`;
export const TrueFalse = ({ handleCorrectChange, correctOption, ...props }) => {
	return (
		<Wrapper>
			<InputWrapper className='p-col-12'>
				<RadioButton
					inputId='rb1'
					value={1}
					onChange={handleCorrectChange}
					checked={correctOption === 1}
				/>
				<label htmlFor='rb1' className='p-radiobutton-label'>
					True
				</label>
			</InputWrapper>
			<InputWrapper className='p-col-12'>
				<RadioButton
					inputId='rb2'
					value={2}
					onChange={handleCorrectChange}
					checked={correctOption === 2}
				/>
				<label htmlFor='rb2' className='p-radiobutton-label'>
					False
				</label>
			</InputWrapper>
		</Wrapper>
	);
};
