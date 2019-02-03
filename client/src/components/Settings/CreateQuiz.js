import React, { useState, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

import server from 'server';

import QuizForm from './QuizForm';

import { Button } from 'styles/Components/Button';
import { Wrapper, InnerWrapper, ModalWrapper } from 'styles/Settings/CreateQuiz';
import OvenIcon from 'assets/oven';

const CreateQuiz = props => {
	const [ newQuiz, setNewQuiz ] = useState(false);
	const [ quiz, setQuiz ] = useState({
		title: '',
		description: '',
		topic: '',
	});

	const handleCreateQuiz = () => {
		server
			.post('/quizzes', quiz)
			.then(({ data }) => {
				props.history.push(`/user/quizzes/${data[0]}`);
			})
			.catch(error => console.log(error));
	};

	return (
		<Fragment>
			<Button label='Bake Quiz' onClick={() => setNewQuiz(true)} style={{ zIndex: 50 }} />
			{newQuiz && (
				<ModalWrapper>
					<Wrapper>
						<div className='wrap'>
							<Button
								style={{ position: 'absolute', top: '5px', right: '5px' }}
								icon='pi pi-times'
								white
								onClick={() => setNewQuiz(false)}
							/>
							<QuizForm quiz={quiz} setQuiz={setQuiz} create={true} />
							<OvenIcon />
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
