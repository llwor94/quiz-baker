import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Button from '../../../../components/Styles/Button';
import _ from 'lodash';

import server from '../../../../utils/server';

import { fetchQuizQuestions } from '../../../../store/actions/quizActions';
import {
	QuestionWrapper,
	EditQuestionWrapper,
} from '../../../../components/Quizzes/Questions/edit';
import { MultipleChoice } from '../../../../components/UserQuiz/InputOptions';
import { TrueFalse } from '../../../../components/Quizzes/Questions/trueFalse';

const EditQuestion = ({ question, quiz, ...props }) => {
	const TFOptions = { option1: 'True', option2: 'False' };
	const [ edit, setEdit ] = useState(false);
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

	useEffect(
		() => {
			setEdit(false);
		},
		[ question ],
	);

	const handleOptionChange = e => {
		setOptions({ ...options, [e.target.name]: e.target.value });
	};

	const handleEditQuestion = () => {
		let newQuestion;
		multipleChoice ? (newQuestion = options) : (newQuestion = TFOptions);
		newQuestion.question = questionTitle;
		newQuestion.answer = correctOption;
		server
			.patch(`quizzes/${quiz.id}/questions/${question.id}`, newQuestion)
			.then(({ data }) => {
				console.log(data);
				fetchQuizQuestions(quiz.id);
			})
			.catch(err => console.log(err));
	};

	if (!edit) return <QuestionWrapper question={question} setEdit={setEdit} />;
	else
		return (
			<EditQuestionWrapper
				handleClick={() => setEdit(false)}
				multipleChoice={multipleChoice}
				setMultipleChoice={setMultipleChoice}
				question={questionTitle}
				setQuestionTitle={setQuestionTitle}
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
					label='Edit Question'
					disabled={
						(multipleChoice && _.some(options, _.isEmpty)) ||
						correctOption === null ||
						!questionTitle ||
						props.loading
					}
					onClick={handleEditQuestion}
				/>
			</EditQuestionWrapper>
		);
};

const mapStateToProps = ({ quizReducer }) => ({
	quiz: quizReducer.edittingQuiz,
});

export default connect(mapStateToProps, { fetchQuizQuestions })(EditQuestion);
