import React, { useEffect, useContext, useState, Fragment } from 'react';
import _ from 'lodash';
import server from '../../utils/server';
import { Button } from '../../Styles/Components/Button';
import { Wrapper, InnerWrapper, Title, Topic } from '../../Styles/UserQuiz/Quiz';
import { UserQuizCtx } from '../../pages/UserQuiz';
import QuizForm from '../Settings/QuizForm';
const Quiz = () => {
	const [ quiz, setQuiz ] = useContext(UserQuizCtx);
	const [ edit, setEdit ] = useState(false);
	const [ newQuiz, setNewQuiz ] = useState(undefined);
	useEffect(() => {
		setNewQuiz(_.pick(quiz, [ 'title', 'description', 'topic' ]));
	}, []);

	const handleQuizEdit = () => {
		if (!edit) setEdit(true);
		else if (!_.isEqual(newQuiz, _.pick(quiz, [ 'title', 'description', 'topic' ]))) {
			server
				.patch(`quizzes/${quiz.id}/edit`, newQuiz)
				.then(response => {
					console.log(response);
					server.get(`quizzes/${quiz.id}`).then(({ data }) => {
						setQuiz(data);
						setEdit(false);
					});
				})
				.catch(err => console.log(err));
		} else setEdit(false);
	};

	return (
		<Wrapper secondary edit={edit}>
			<InnerWrapper>
				{edit ? (
					<Fragment>
						<Button
							style={{ position: 'absolute', top: '5px', right: '5px' }}
							icon='pi pi-times'
							className='p-button-secondary'
							onClick={() => setEdit(false)}
						/>
						<QuizForm quiz={newQuiz} setQuiz={setNewQuiz} />
					</Fragment>
				) : (
					<Fragment>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<Title>{quiz.title}</Title>
							<Topic>{quiz.topic}</Topic>
						</div>
						{quiz.description && <p>{quiz.description}</p>}
					</Fragment>
				)}
			</InnerWrapper>
			<Button label={edit ? 'Save' : 'Edit'} onClick={handleQuizEdit} />
		</Wrapper>
	);
};

export default Quiz;
