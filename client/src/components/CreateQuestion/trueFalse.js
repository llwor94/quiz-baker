import React from 'react';
import styled from 'styled-components';
import { RadioButton } from 'primereact/radiobutton';

export const TrueFalse = ({ handleCorrectChange, correctOption, ...props }) => {
	return (
		<div>
			<div className='p-col-12'>
				<RadioButton
					inputId='rb1'
					value={1}
					onChange={handleCorrectChange}
					checked={correctOption === 1}
				/>
				<label htmlFor='rb1' className='p-radiobutton-label'>
					True
				</label>
			</div>
			<div className='p-col-12'>
				<RadioButton
					inputId='rb2'
					value={2}
					onChange={handleCorrectChange}
					checked={correctOption === 2}
				/>
				<label htmlFor='rb2' className='p-radiobutton-label'>
					False
				</label>
			</div>
		</div>
	);
};
