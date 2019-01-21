import React, { useState, useContext, useEffect, Fragment } from 'react';
import server from '../../utils/server';

import { UserQuizCtx, QuizQuestionsCtx } from '../../pages/UserQuiz';
import { Wrapper, Title } from '../../Styles/UserQuiz/Questions';
import { Button } from '../../Styles/Components/Button';
import EditQuestion from './EditQuestion';

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
						<li
							key={i}
							style={{
								color: question.answer === i + 1 ? 'green' : 'black',
								fontWeight: question.answer === i + 1 && 'bold',
							}}
						>
							{option}
						</li>
					))}
				</ul>
			</Wrapper>
		);
	else return <EditQuestion question={question} setEdit={setEdit} handleEdit={handleEdit} />;
};

export default Question;
