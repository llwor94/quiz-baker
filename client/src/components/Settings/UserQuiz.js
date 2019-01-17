import React, { useState, useEffect, useContext, Fragment } from 'react';
import { Dialog } from 'primereact/dialog';
import server from '../../utils/server';
import { UserQuizzesCtx } from '../../pages/Settings';
import { UserCtx } from '../../App';
import Loading from '../Styles/Loading';
import { Button } from '../../Styles/Components/Button';
import {
	Wrapper,
	InnerWrapper,
	Header,
	DescriptionWrapper,
	FooterWrapper,
} from '../../Styles/Settings/UserQuiz';
const UserQuiz = ({ quiz }) => {
	const [ userQuizzes, setUserQuizzes ] = useContext(UserQuizzesCtx);
	const [ user, setUser ] = useContext(UserCtx);
	console.log(quiz.quiz);
	const [ modalVisable, setModalVisable ] = useState(false);

	const deleteQuiz = () => {
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
			<Button
				label='Yes'
				icon='pi pi-check'
				onClick={deleteQuiz}
				className='p-button-danger'
			/>
			<Button
				label='No'
				icon='pi pi-times'
				onClick={() => setModalVisable(false)}
				className='p-button-secondary'
			/>
		</div>
	);

	return (
		<Wrapper>
			<InnerWrapper>
				<Header>
					<a>{quiz.topic}</a>
				</Header>
				<div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
					<a>{quiz.title}</a>
				</div>
				<Dialog
					visible={modalVisable}
					style={{ width: '25vw' }}
					footer={footer}
					onHide={() => setModalVisable(false)}
				>
					Are you sure you'd like to delete your quiz {quiz.title}? This action cannot be
					undone.
				</Dialog>
				{quiz.description && (
					<DescriptionWrapper>
						<p>{quiz.description}</p>
					</DescriptionWrapper>
				)}
				<FooterWrapper>
					<a style={{ cursor: 'default', fontWeight: 'bold' }}>
						{quiz.question_count} questions
					</a>
					<a style={{ cursor: 'default', fontWeight: 'bold' }}>
						{quiz.votes === 1 ? '1 vote' : `${quiz.votes} votes`}
					</a>
					<a onClick={() => setModalVisable(true)}>Delete</a>
				</FooterWrapper>
			</InnerWrapper>
		</Wrapper>
	);
};

export default UserQuiz;
