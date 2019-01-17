import React, { useState, useContext, useEffect, Fragment } from 'react';
import _ from 'lodash';
import server from '../../utils/server';
import { EditWrapper, InputTitleWrapper } from '../../Styles/UserQuiz/Questions';
import { Button } from '../../Styles/Components/Button';
import { Input } from '../../Styles/Components/Input';
import { ToggleButton } from 'primereact/togglebutton';
import { MultipleChoice, TrueFalse } from './InputOptions';
import { UserQuizCtx } from '../../pages/UserQuiz';

const EditQuestion = ({ question, handleEdit, setEdit }) => {
	const [ quiz, setQuiz ] = useContext(UserQuizCtx);
	const TFOptions = { option1: 'True', option2: 'False' };
	const [ multipleChoice, setMultipleChoice ] = useState(false);
	const [ questionTitle, setQuestionTitle ] = useState(undefined);
	const [ options, setOptions ] = useState({});
	const [ correctOption, setCorrect ] = useState(undefined);

	useEffect(() => {
		let isMultipleChoice = question.options.length === 4;
		setMultipleChoice(isMultipleChoice);
		if (isMultipleChoice) {
			setOptions(
				question.options.reduce(
					(o, current, i) => ({ ...o, [`option${i + 1}`]: current }),
					{},
				),
			);
		} else {
			setOptions({
				option1: '',
				option2: '',
				option3: '',
				option4: '',
			});
		}
		setCorrect(question.answer);
		setQuestionTitle(question.question);
	}, []);

	const handleEditQuestion = () => {
		let newQuestion;
		multipleChoice ? (newQuestion = options) : (newQuestion = TFOptions);
		newQuestion.question = questionTitle;
		newQuestion.answer = correctOption;
		server
			.patch(`quizzes/${quiz.id}/questions/${question.id}`, newQuestion)
			.then(({ data }) => {
				handleEdit();
			})
			.catch(err => console.log(err));
	};

	const handleOptionChange = e => {
		setOptions({ ...options, [e.target.name]: e.target.value });
	};

	return (
		<EditWrapper edit>
			<Button
				style={{ position: 'absolute', top: '3px', right: '3px' }}
				icon='pi pi-times'
				onClick={() => setEdit(false)}
			/>
			<ToggleButton
				style={{ width: '150px', marginTop: '5px' }}
				onLabel='Multiple Choice'
				offLabel='True/False'
				checked={multipleChoice}
				onChange={e => setMultipleChoice(e.value)}
			/>
			<InputTitleWrapper>
				<Input
					value={questionTitle}
					onChange={e => setQuestionTitle(e.target.value)}
					label='Question Title'
				/>
			</InputTitleWrapper>
			{multipleChoice ? (
				<MultipleChoice
					correctOption={correctOption}
					handleCorrectChange={e => setCorrect(e.value)}
					options={options}
					handleOptionChange={handleOptionChange}
				/>
			) : (
				<TrueFalse
					handleCorrectChange={e => setCorrect(e.value)}
					correctOption={correctOption}
				/>
			)}
			<Button
				label='Edit Question'
				disabled={
					(multipleChoice && _.some(options, _.isEmpty)) ||
					correctOption === null ||
					!questionTitle
				}
				onClick={handleEditQuestion}
			/>
		</EditWrapper>
	);
};

export default EditQuestion;
