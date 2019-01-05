import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Button } from 'primereact/button';
import _ from 'lodash';

import { createQuestion } from '../store/actions/questionActions';
import { NewQuestion } from '../components/CreateQuestion';
import { MultipleChoice } from '../components/CreateQuestion/multipleChoice';
import { TrueFalse } from '../components/CreateQuestion/trueFalse';

const CreateQuestion = ({ ...props }) => {
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
		props.createQuestion(options);
		props.setIsNewQuestion(false);
	};
	return (
		<NewQuestion
			multipleChoice={multipleChoice}
			question={questionTitle}
			setQuestionTitle={setQuestionTitle}
			setMultipleChoice={setMultipleChoice}
			handleClick={() => props.setIsNewQuestion(false)}
		>
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
		</NewQuestion>
	);
};

const mapStateToProps = ({ quizReducer, questionReducer }) => ({
	loading: questionReducer.loading,
	error: questionReducer.error,
});

export default connect(mapStateToProps, { createQuestion })(CreateQuestion);
