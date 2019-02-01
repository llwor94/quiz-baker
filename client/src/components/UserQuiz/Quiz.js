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
	const [ timeLimit, setTimeLimit ] = useState(undefined);
	useEffect(() => {
		setNewQuiz(_.pick(quiz, [ 'title', 'description', 'topic', 'question_time_limit' ]));
	}, []);

	const handleQuizEdit = () => {
		if (!edit) setEdit(true);
		else if (
			!_.isEqual(
				newQuiz,
				_.pick(quiz, [ 'title', 'description', 'topic', 'question_time_limit' ]),
			)
		) {
			console.log(newQuiz);

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
				<Button
					style={{ position: 'absolute', top: '5px', right: '5px' }}
					icon={edit ? 'pi pi-times' : 'pi pi-pencil'}
					onClick={() => setEdit(!edit)}
				/>
				{edit ? (
					<Fragment>
						<QuizForm quiz={newQuiz} setQuiz={setNewQuiz} />
						<Button label={edit ? 'Save' : 'Edit'} onClick={handleQuizEdit} />
					</Fragment>
				) : (
					<Fragment>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<Title>{quiz.title}</Title>
							<Topic>{quiz.topic}</Topic>
						</div>
						{quiz.question_time_limit && (
							<p>{quiz.question_time_limit} seconds per question.</p>
						)}

						{quiz.description && <p className='description'>{quiz.description}</p>}
					</Fragment>
				)}
			</InnerWrapper>
		</Wrapper>
	);
};

export default Quiz;
