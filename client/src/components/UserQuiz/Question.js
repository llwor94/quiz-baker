import React, { useState, useContext } from 'react';

import server from '../../utils/server';

import { UserQuizCtx, QuizQuestionsCtx } from '../../pages/UserQuiz';

import EditQuestion from './EditQuestion';

import { Wrapper, Title, AnswerOption } from '../../Styles/UserQuiz/Questions';
import { Button } from '../../Styles/Components/Button';

const Question = ({ question }) => {
	const [ questions, setQuestions ] = useContext(QuizQuestionsCtx);
	const [ quiz, setQuiz ] = useContext(UserQuizCtx);
	const [ edit, setEdit ] = useState(false);

	const handleEdit = () => {
		server.get(`/quizzes/${quiz.id}/questions`).then(({ data }) => {
			setQuestions(data);
			setEdit(false);
		});
	};
	if (!edit)
		return (
			<Wrapper>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<Title main>{question.question}</Title>
					<Button
						style={{ position: 'absolute', top: '5px', right: '5px' }}
						icon='pi pi-pencil'
						onClick={() => setEdit(true)}
					/>
				</div>
				<ul style={{ paddingLeft: '40px' }}>
					{question.options.map((option, i) => (
						<AnswerOption key={i} correct={question.answer === i + 1}>
							{option}
						</AnswerOption>
					))}
				</ul>
			</Wrapper>
		);
	else return <EditQuestion question={question} setEdit={setEdit} handleEdit={handleEdit} />;
};

export default Question;
