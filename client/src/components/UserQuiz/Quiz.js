import React, { useEffect, useContext, useState, Fragment } from 'react';
import _ from 'lodash';
import server from '../../utils/server';
import { Button } from '../../Styles/Components/Button';
import { Wrapper, InnerWrapper, Title, Topic } from '../../Styles/UserQuiz/Quiz';
import { UserQuizCtx } from '../../pages/UserQuiz';
import QuizForm from '../Settings/QuizForm';
import converter from '../../utils/timeConvert';
const Quiz = () => {
	const [ quiz, setQuiz ] = useContext(UserQuizCtx);
	const [ edit, setEdit ] = useState(false);
	const [ newQuiz, setNewQuiz ] = useState(undefined);
	const [ timeLimit, setTimeLimit ] = useState(undefined);
	useEffect(() => {
		// setNewQuiz(_.pick(quiz, [ 'title', 'description', 'topic' ]));
		let editQuiz = _.pick(quiz, [ 'title', 'description', 'topic' ]);
		setNewQuiz({ ...editQuiz, time_limit_seconds: quiz.time_limit_seconds / 60 });
		if (quiz.time_limit_seconds) {
			let time = converter(quiz.time_limit_seconds);
			setTimeLimit(time);
		}
	}, []);

	useEffect(
		() => {
			if (quiz.time_limit_seconds) {
				let time = converter(quiz.time_limit_seconds);
				setTimeLimit(time);
			}
		},
		[ quiz ],
	);

	const handleQuizEdit = () => {
		if (!edit) setEdit(true);
		else if (
			!_.isEqual(
				newQuiz,
				_.pick(quiz, [ 'title', 'description', 'topic', 'time_limit_seconds' ]),
			)
		) {
			console.log(newQuiz);
			if (newQuiz.time_limit_seconds) {
				newQuiz.time_limit_seconds = parseFloat(newQuiz.time_limit_seconds) * 60;
			}
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
							{quiz.time_limit_seconds && <p>{timeLimit} minutes</p>}
						</div>
						{quiz.description && <p>{quiz.description}</p>}
					</Fragment>
				)}
			</InnerWrapper>
		</Wrapper>
	);
};

export default Quiz;
