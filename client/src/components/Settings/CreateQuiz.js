import React, { useState, useContext, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import server from '../../utils/server';
import _ from 'lodash';

import { Button } from '../../Styles/Components/Button';
import { Wrapper, InnerWrapper, ModalWrapper } from '../../Styles/Settings/CreateQuiz';
import QuizForm from './QuizForm';
import ovenIcon from '../../assets/oven.svg';

import { UserQuizzesCtx } from '../../pages/Settings';

const CreateQuiz = props => {
	const [ newQuiz, setNewQuiz ] = useState(false);
	const [ quiz, setQuiz ] = useState({
		title: '',
		description: '',
		topic: '',
	});
	const [ userQuizzes, setUserQuizzes ] = useContext(UserQuizzesCtx);

	const [ timeLimit, setTimeLimit ] = useState(undefined);

	const handleCreateQuiz = () => {
		if (quiz.time_limit_seconds) {
			quiz.time_limit_seconds = quiz.time_limit_seconds * 60;
		}
		console.log(quiz);
		server
			.post('/quizzes', quiz)
			.then(({ data }) => {
				console.log(data);
				props.history.push(`/user/quizzes/${data[0]}`);
			})
			.catch(error => console.log(error));
	};
	console.log(newQuiz);

	return (
		<Fragment>
			<Button label='Bake Quiz' onClick={() => setNewQuiz(true)} style={{ zIndex: 50 }} />
			{newQuiz && (
				<ModalWrapper>
					<Wrapper>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<Button
								style={{ position: 'absolute', top: '5px', right: '5px' }}
								icon='pi pi-times'
								white
								onClick={() => setNewQuiz(false)}
							/>
							<QuizForm quiz={quiz} setQuiz={setQuiz} />
							<img src={ovenIcon} />
						</div>

						<InnerWrapper>
							{!quiz.topic &&
							quiz.title && (
								<div>
									Please select a topic for your quiz{' '}
									<span style={{ fontWeight: 'bold' }}>{quiz.title}</span>
								</div>
							)}
							{quiz.topic &&
							!quiz.title && (
								<div>
									Please name your quiz for topic{' '}
									<span style={{ fontWeight: 'bold' }}>{quiz.topic}</span>
								</div>
							)}
							<Button
								label='Bake Quiz!'
								disabled={!quiz.title || !quiz.topic || !quiz.description}
								onClick={handleCreateQuiz}
							/>
						</InnerWrapper>
					</Wrapper>
				</ModalWrapper>
			)}
		</Fragment>
	);
};

export default withRouter(CreateQuiz);
