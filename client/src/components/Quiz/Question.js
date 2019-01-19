import React, { useEffect, useState, Fragment, useContext } from 'react';
import server from '../../utils/server';
import _ from 'lodash';
import { Growl } from 'primereact/growl';
import Loading from '../Styles/Loading';
import { Button } from '../../Styles/Components/Button';
import { QuestionCtx } from '../../containers/Quiz';
import { QuizCtx, ResponseCtx } from '../../pages/Quiz';
import { RadioButton } from 'primereact/radiobutton';
import {
	MainWrapper,
	Wrapper,
	AnswerWrapper,
	Answer,
	Label,
	QuestionWrapper,
	Logo,
} from '../../Styles/Quiz/Question';

const Question = () => {
	const [ quiz, setQuiz ] = useContext(QuizCtx);
	const [ currentQuestion, setCurrentQuestion ] = useContext(QuestionCtx);
	const [ questionResponse, setQuestionResponse ] = useContext(ResponseCtx);
	const [ question, setQuestion ] = useState(quiz.questions[0]);
	const [ selected, setSelected ] = useState(null);
	// useEffect(() => {
	// 	setQuestion(quiz.questions[0]);
	// }, []);
	console.log(currentQuestion);
	console.log(quiz);
	useEffect(
		() => {
			if (currentQuestion) {
				console.log('hey');
				setQuestion(quiz.questions[currentQuestion]);
			}
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
			<div style={{ width: '500px' }}>
				<Wrapper>
					<QuestionWrapper>{question.question}</QuestionWrapper>
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
					<Logo>
						<span className='Q'>Q</span>
						<span className='B'>B</span>
					</Logo>
				</Wrapper>
				<Button onClick={checkAnswer} label='Submit' disabled={selected === null} full />
			</div>
		</Fragment>
	);
};

export default Question;
