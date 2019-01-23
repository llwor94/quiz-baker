import React, { useState, useEffect, useContext, Fragment } from 'react';
import { Dialog } from 'primereact/dialog';
import server from '../../utils/server';
import { UserQuizzesCtx } from '../../pages/Settings';
import { UserCtx } from '../../App';
import { withRouter } from 'react-router-dom';
import { Button } from '../../Styles/Components/Button';
import {
	Wrapper,
	InnerWrapper,
	Header,
	DescriptionWrapper,
	FooterWrapper,
	Title,
	Topic,
} from '../../Styles/Settings/UserQuiz';
const UserQuiz = ({ quiz, ...props }) => {
	const [ userQuizzes, setUserQuizzes ] = useContext(UserQuizzesCtx);
	const [ user, setUser ] = useContext(UserCtx);
	console.log(quiz.quiz);
	const [ modalVisable, setModalVisable ] = useState(false);

	const deleteQuiz = e => {
		server
			.delete(`quizzes/${quiz.id}`)
			.then(response => {
				server.get('/quizzes').then(({ data }) => {
					setUserQuizzes(
						data
							.filter(quiz => quiz.author === user.username)
							.sort((a, b) => b.id - a.id),
					);
					setModalVisable(false);
				});
			})
			.catch(error => console.log(error));
	};

	const footer = (
		<div>
			<Button label='Yes' icon='pi pi-check' onClick={deleteQuiz} />
			<Button
				label='No'
				icon='pi pi-times'
				onClick={() => setModalVisable(false)}
				secondary
			/>
		</div>
	);

	return (
		<Wrapper>
			<Dialog
				visible={modalVisable}
				style={{ width: '25vw' }}
				footer={footer}
				onHide={() => setModalVisable(false)}
			>
				Are you sure you'd like to delete your quiz {quiz.title}? This action cannot be
				undone.
			</Dialog>
			<InnerWrapper>
				<div onClick={() => props.history.push(`/user/quizzes/${quiz.id}`)}>
					<Header>
						<Title>{quiz.title}</Title>
						<Topic>{quiz.topic}</Topic>
					</Header>
					<div
						style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
					/>

					{quiz.description && (
						<DescriptionWrapper>
							<p>{quiz.description}</p>
						</DescriptionWrapper>
					)}
				</div>
				<FooterWrapper>
					<div>
						<a style={{ cursor: 'default', fontWeight: 'bold' }}>
							{quiz.question_count} questions
						</a>
						<span style={{ padding: '0 4px' }}>&#8226;</span>
						<a style={{ cursor: 'default', fontWeight: 'bold' }}>
							{quiz.votes === 1 ? '1 vote' : `${quiz.votes} votes`}
						</a>
					</div>
					<Button white icon='pi pi-trash' onClick={() => setModalVisable(true)} />
				</FooterWrapper>
			</InnerWrapper>
		</Wrapper>
	);
};

export default withRouter(UserQuiz);
