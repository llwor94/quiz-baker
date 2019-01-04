import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RadioButton } from 'primereact/radiobutton';
import { InputText } from 'primereact/inputtext';
import { ToggleButton } from 'primereact/togglebutton';
import { Button } from 'primereact/button';
import _ from 'lodash';

import { createQuestion } from '../store/actions/questionActions';
import { MultipleChoice } from '../components/CreateQuestion/multipleChoice';
import { TrueFalse } from '../components/CreateQuestion/trueFalse';

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
				<MultipleChoice
					correctOption={correctOption}
					handleCorrectChange={handleCorrectChange}
					options={options}
					handleOptionChange={handleOptionChange}
				/>
			) : (
				<TrueFalse
					handleCorrectChange={handleCorrectChange}
					correctOption={correctOption}
				/>
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
