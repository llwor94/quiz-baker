import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RadioButton } from 'primereact/radiobutton';
import { InputText } from 'primereact/inputtext';
import { ToggleButton } from 'primereact/togglebutton';
import { Button } from 'primereact/button';
import _ from 'lodash';

import { createQuestion } from '../store/actions/questionActions';

const CreateQuestions = ({ ...props }) => {
	const [ multipleChoice, setMultipleChoice ] = useState(true);
	const [ questionTitle, setQuestionTitle ] = useState(undefined);
	const [ options, setOptions ] = useState({
		option1: '',
		option2: '',
		option3: '',
		option4: '',
	});
	const [ correctOption, setCorrect ] = useState(null);

	useEffect(
		() => {
			if (multipleChoice) {
				setOptions({
					option1: '',
					option2: '',
					option3: '',
					option4: '',
				});
				setCorrect(null);
			} else {
				setOptions({ option1: 'True', option2: 'False' });
				setCorrect(null);
			}
		},
		[ multipleChoice ],
	);

	const handleCorrectChange = e => {
		setCorrect(e.value);
	};

	const handleOptionChange = e => {
		setOptions({ ...options, [e.target.name]: e.target.value });
	};

	const handleCreateQuestion = () => {
		options.question = questionTitle;
		options.answer = correctOption;
		props.createQuestion(props.newQuiz.id, options);
	};
	return (
		<div>
			<div>New Question for {props.newQuiz.title}</div>
			<InputText
				placeholder='Question Title'
				value={questionTitle}
				onChange={e => setQuestionTitle(e.target.value)}
			/>
			<ToggleButton
				style={{ width: '150px' }}
				onLabel='Multiple Choice'
				offLabel='True/False'
				checked={multipleChoice}
				onChange={e => setMultipleChoice(e.value)}
			/>
			{multipleChoice ? (
				<div>
					<div className='p-inputgroup'>
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
					</div>
					<div className='p-inputgroup'>
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
					</div>
					<div className='p-inputgroup'>
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
					</div>
					<div className='p-inputgroup'>
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
					</div>
				</div>
			) : (
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
			)}
			<Button
				label='Create Question'
				disabled={
					_.some(options, _.isEmpty) ||
					correctOption === null ||
					!questionTitle ||
					props.loading
				}
				className='p-button-raised p-button-secondary'
				onClick={handleCreateQuestion}
			/>
		</div>
	);
};

const mapStateToProps = ({ quizReducer, questionReducer }) => ({
	newQuiz: quizReducer.newQuiz,
	loading: questionReducer.loading,
	error: questionReducer.error,
});

export default connect(mapStateToProps, { createQuestion })(CreateQuestions);
