import React from 'react';
import styled from 'styled-components';

import { RadioButton } from 'primereact/radiobutton';
import { InputText } from 'primereact/inputtext';

const Wrapper = styled.div`
	width: 50%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding-bottom: 10px;
`;

const InputWrapper = styled.div`
padding: 5px 0;
`;

export const MultipleChoice = ({
	correctOption,
	handleCorrectChange,
	options,
	handleOptionChange,
	...props
}) => {
	return (
		<Wrapper className='p-grid p-fluid'>
			<InputWrapper className='p-inputgroup'>
				<span className='p-inputgroup-addon'>
					<RadioButton
						checked={correctOption === 1}
						value={1}
						onChange={handleCorrectChange}
					/>
				</span>
				<InputText
					name='option1'
					placeholder='Option 1'
					value={options.option1}
					onChange={handleOptionChange}
				/>
			</InputWrapper>
			<InputWrapper className='p-inputgroup'>
				<span className='p-inputgroup-addon'>
					<RadioButton
						checked={correctOption === 2}
						value={2}
						onChange={handleCorrectChange}
					/>
				</span>
				<InputText
					name='option2'
					placeholder='Option 2'
					value={options.option2}
					onChange={handleOptionChange}
				/>
			</InputWrapper>
			<InputWrapper className='p-inputgroup'>
				<span className='p-inputgroup-addon'>
					<RadioButton
						checked={correctOption === 3}
						value={3}
						onChange={handleCorrectChange}
					/>
				</span>
				<InputText
					name='option3'
					placeholder='Option 3'
					value={options.option3}
					onChange={handleOptionChange}
				/>
			</InputWrapper>
			<InputWrapper className='p-inputgroup'>
				<span className='p-inputgroup-addon'>
					<RadioButton
						checked={correctOption === 4}
						value={4}
						onChange={handleCorrectChange}
					/>
				</span>
				<InputText
					name='option4'
					placeholder='Option 4'
					value={options.option4}
					onChange={handleOptionChange}
				/>
			</InputWrapper>
		</Wrapper>
	);
};
