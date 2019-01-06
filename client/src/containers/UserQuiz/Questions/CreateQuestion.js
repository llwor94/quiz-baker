import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button } from 'primereact/button';
import _ from 'lodash';
import server from '../../../utils/server';

import { fetchQuizQuestions } from '../../../store/actions/questionActions';
import { EditQuestionWrapper } from '../../../components/Quizzes/Questions/edit';
import { MultipleChoice } from '../../../components/Quizzes/Questions/multipleChoice';
import { TrueFalse } from '../../../components/Quizzes/Questions/trueFalse';

const CreateQuestion = ({ fetchQuizQuestions, quiz, ...props }) => {
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

	const handleOptionChange = e => {
		setOptions({ ...options, [e.target.name]: e.target.value });
	};

	const handleCreateQuestion = () => {
		options.question = questionTitle;
		options.answer = correctOption;
		server
			.post(`quizzes/${quiz.id}/questions`, options)
			.then(({ data }) => {
				fetchQuizQuestions(quiz.id);
				props.setIsNewQuestion(false);
			})
			.catch(err => console.log(err));
	};
	return (
		<EditQuestionWrapper
			new
			multipleChoice={multipleChoice}
			question={questionTitle}
			setQuestionTitle={setQuestionTitle}
			setMultipleChoice={setMultipleChoice}
			handleClick={() => props.setIsNewQuestion(false)}
		>
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
		</EditQuestionWrapper>
	);
};

const mapStateToProps = ({ questionReducer, quizReducer }) => ({
	loading: questionReducer.loading,
	error: questionReducer.error,
	quiz: quizReducer.edittingQuiz,
});

export default connect(mapStateToProps, { fetchQuizQuestions })(CreateQuestion);
