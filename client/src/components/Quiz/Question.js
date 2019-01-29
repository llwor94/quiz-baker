import React, { useEffect, useState, Fragment, useContext, useRef } from 'react';
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
import Timer from '../../Styles/Components/Timer';
import anime from 'animejs';
import { Transition } from 'react-transition-group';

const fadingInStart = question => anime({ targets: question, opacity: 0 });
const fadingIn = question => anime({ targets: question, opacity: 0.5 });
const fadedIn = question => anime({ targets: question, opacity: 1 });
const fadingOut = question => anime({ targets: question, opacity: 0.5 });

const Question = () => {
	const [ quiz, setQuiz ] = useContext(QuizCtx);
	const [ currentQuestion, setCurrentQuestion ] = useContext(QuestionCtx);
	const [ questionResponse, setQuestionResponse ] = useContext(ResponseCtx);
	const [ question, setQuestion ] = useState(quiz.questions[0]);
	const [ selected, setSelected ] = useState(null);
	const [ checking, setChecking ] = useState(false);

	// useEffect(() => {
	// 	anime({ targets: '.wrapper', opacity: 1, duration: 3000 });
	// }, []);

	useEffect(
		() => {
			if (currentQuestion) {
				anime({
					targets: '.wrapper',
					opacity: 0,
					duration: 1500,
					complete: function(anim) {
						setQuestion(quiz.questions[currentQuestion]);
					},
				});
			}
		},
		[ currentQuestion ],
	);

	useEffect(
		() => {
			anime({ targets: '.wrapper', opacity: 1, duration: 2000 });
		},
		[ question ],
	);

	const handleTimer = () => {
		let newQuestions = [ ...questionResponse ];
		newQuestions[currentQuestion] = {
			correct: false,
			question: question,
			option: 'You did not answer this question in time.',
		};
		setQuestionResponse(newQuestions);
		setCurrentQuestion(currentQuestion + 1);
	};

	const checkAnswer = () => {
		setChecking(true);

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
				setChecking(false);
			})
			.catch(err => console.log(err));
	};

	return (
		<Wrapper>
			<div className='inner'>
				<div className='wrapper'>
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
						{quiz.question_time_limit && (
							<Timer
								startCount={quiz.question_time_limit}
								handleTimer={handleTimer}
								question={question}
								reset={checking}
							/>
						)}
					</AnswerWrapper>
				</div>
				<Logo>
					<span className='Q'>Q</span>
					<span className='B'>B</span>
				</Logo>
			</div>

			<Button
				onClick={checkAnswer}
				label='Submit'
				disabled={selected === null}
				full
				style={{ margin: '20px 0 10px' }}
			/>
		</Wrapper>
	);
};

export default Question;
