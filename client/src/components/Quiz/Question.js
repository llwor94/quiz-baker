import React, { useEffect, useState, Fragment, useContext } from 'react';
import server from '../../utils/server';
import _ from 'lodash';
import { Growl } from 'primereact/growl';
import { Button } from '../../Styles/Components/Button';
import { QuestionCtx } from '../../containers/Quiz';
import { QuizCtx, ResponseCtx } from '../../pages/Quiz';
import { RadioButton } from 'primereact/radiobutton';
import { Wrapper, AnswerWrapper, Answer, Label } from '../../Styles/Quiz/Question';

const Question = () => {
	const [ quiz, setQuiz ] = useContext(QuizCtx);
	const [ currentQuestion, setCurrentQuestion ] = useContext(QuestionCtx);
	const [ questionResponse, setQuestionResponse ] = useContext(ResponseCtx);
	const [ question, setQuestion ] = useState(quiz.questions[currentQuestion]);
	const [ selected, setSelected ] = useState(null);

	useEffect(
		() => {
			setQuestion(quiz.questions[currentQuestion]);
		},
		[ currentQuestion ],
	);
	const checkAnswer = () => {
		let option = selected + 1;
		server
			.get(`quizzes/${quiz.id}/questions/${question.id}/response`, {
				params: { option },
			})
			.then(({ data }) => {
				let newQuestions = [ ...questionResponse ];
				newQuestions[currentQuestion] = {
					correct: data.correct,
					question: question,
					option: question.options[selected],
				};
				setQuestionResponse(newQuestions);
				setCurrentQuestion(currentQuestion + 1);

				setSelected(null);
			})
			.catch(err => console.log(err));
	};
	return (
		<Fragment>
			<Wrapper>
				<a>{question.question}</a>
				<AnswerWrapper>
					{question.options &&
						question.options.map((option, i) => (
							<Answer key={i}>
								<RadioButton
									inputId={i.toString()}
									value={i}
									onChange={e => setSelected(e.value)}
									checked={selected === i}
								/>
								<Label htmlFor={i.toString()}>{option}</Label>
							</Answer>
						))}
				</AnswerWrapper>
			</Wrapper>
			<Button onClick={checkAnswer} label='Submit' disabled={selected === null} full />
		</Fragment>
	);
};

export default Question;
