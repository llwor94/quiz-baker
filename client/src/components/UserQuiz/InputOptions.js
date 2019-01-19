import React from 'react';
import styled from 'styled-components';

import RadioButton from '../Styles/RadioButton';
import { StyledInput, Label } from '../../Styles/Components/Input';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	padding-bottom: 10px;
	.p-radiobutton .p-radiobutton-box.p-highlight {
		background-color: ${props => props.theme.aqua};
		border-color: ${props => props.theme.aqua};
	}
	.p-radiobutton .p-radiobutton-box.p-highlight:not(.p-disabled):hover {
		background-color: ${props => props.theme.darkAqua};
		border-color: ${props => props.theme.darkAqua};
	}
`;

const InputWrapper = styled.div`padding: 5px 0;`;

export const MultipleChoice = ({
	correctOption,
	handleCorrectChange,
	options,
	handleOptionChange,
	...props
}) => {
	return (
		<Wrapper>
			<InputWrapper className='p-inputgroup'>
				<span className='p-inputgroup-addon'>
					<RadioButton
						checked={correctOption === 1}
						value={1}
						onChange={handleCorrectChange}
					/>
				</span>
				<StyledInput
					name='option1'
					placeholder='Option 1'
					value={options.option1}
					onChange={handleOptionChange}
					radio
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

				<StyledInput
					name='option2'
					placeholder='Option 2'
					value={options.option2}
					onChange={handleOptionChange}
					radio
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

				<StyledInput
					name='option3'
					placeholder='Option 3'
					value={options.option3}
					onChange={handleOptionChange}
					radio
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

				<StyledInput
					name='option4'
					placeholder='Option 4'
					value={options.option4}
					onChange={handleOptionChange}
					radio
				/>
			</InputWrapper>
		</Wrapper>
	);
};

export const TrueFalse = ({ handleCorrectChange, correctOption, ...props }) => {
	return (
		<Wrapper>
			<InputWrapper className='p-inputgroup'>
				<span className='p-inputgroup-addon'>
					<RadioButton
						inputId='rb1'
						value={1}
						onChange={handleCorrectChange}
						checked={correctOption === 1}
					/>
				</span>
				<Label htmlFor='rb1'>True</Label>
			</InputWrapper>
			<InputWrapper className='p-inputgroup'>
				<span className='p-inputgroup-addon'>
					<RadioButton
						inputId='rb2'
						value={2}
						onChange={handleCorrectChange}
						checked={correctOption === 2}
					/>
				</span>
				<Label htmlFor='rb2'>False</Label>
			</InputWrapper>
		</Wrapper>
	);
};
