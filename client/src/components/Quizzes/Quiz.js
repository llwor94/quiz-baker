import React, { useEffect, useState, useContext } from 'react';

import { UserCtx } from '../../App';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCookieBite, faCookie } from '@fortawesome/free-solid-svg-icons';

import server from '../../utils/server';
import { QuizzesCtx } from '../../pages/Quizzes';
import {
	Wrapper,
	HatWrapper,
	LeftSide,
	InnerWrapper,
	Title,
	Header,
	Topic,
	Score,
	DescriptionWrapper,
	UserNameWrapper,
	RightSide,
	FooterWrapper,
} from '../../Styles/Quizzes/Quiz';
import hatIcon from '../../assets/chef.svg';
import { ProfileIcon } from '../../Styles/Components/Image';
import { Growl } from 'primereact/growl';

const Quiz = ({ quiz, ...props }) => {
	const growl = React.createRef();
	const [ quizzes, setQuizzes ] = useContext(QuizzesCtx);
	const [ user, setUser ] = useContext(UserCtx);

	const handleCopy = id => {
		let value = `http://localhost:3000/quizzes/${id}`;
		navigator.clipboard.writeText(value).then(() => {
			growl.current.show({ severity: 'info', summary: 'Link Copied!' });
		});
	};

	const handleFavoriteToggle = quiz => {
		server
			.patch(`quizzes/${quiz.id}`, { favorite: !quiz.favorite })
			.then(({ data }) => {
				server.get('/quizzes').then(({ data }) => {
					setQuizzes(data);
				});
			})
			.catch(err => console.log(err));
	};

	const handleVote = val => {
		if (user) {
			let user_vote;
			if (val === quiz.user_vote) {
				user_vote = 0;
			} else {
				user_vote = val;
			}
			server
				.patch(`quizzes/${quiz.id}`, { vote: user_vote })
				.then(({ data }) => {
					server.get('/quizzes').then(({ data }) => {
						setQuizzes(data);
					});
				})
				.catch(err => console.log(err));
		}
	};
	return (
		<Wrapper>
			<Growl ref={growl} />
			{user && user.username === quiz.author && <HatWrapper src={hatIcon} />}
			<div style={{ display: 'flex' }}>
				<LeftSide user={user}>
					<i
						className='pi pi-chevron-up'
						style={{
							color: quiz.user_vote === 1 ? '#DC758F' : !user ? 'gray' : 'black',
						}}
						onClick={() => handleVote(1)}
					/>
					<p
						style={{
							color: quiz.user_vote
								? quiz.user_vote === 1 ? '#DC758F' : '#E3D3E4'
								: 'black',
						}}
					>
						{quiz.votes}
					</p>
					<i
						className='pi pi-chevron-down'
						style={{
							color: quiz.user_vote === -1 ? '#E3D3E4' : !user ? 'gray' : 'black',
						}}
						onClick={() => handleVote(-1)}
					/>
				</LeftSide>
				<InnerWrapper>
					<div>
						<Header>
							<Title onClick={() => props.history.push(`quizzes/${quiz.id}`)}>
								{quiz.title}
							</Title>
							<Topic>{quiz.topic}</Topic>
						</Header>

						{quiz.description && (
							<DescriptionWrapper>
								<p>
									{quiz.description.length > 70 ? (
										quiz.description.slice(0, 120) + '...'
									) : (
										quiz.description
									)}
								</p>
							</DescriptionWrapper>
						)}
					</div>
					<FooterWrapper>
						<UserNameWrapper>
							<ProfileIcon src={quiz.author_img} />
							Created by <a>{quiz.author}</a>
						</UserNameWrapper>

						<a onClick={handleCopy}>Share</a>
					</FooterWrapper>
				</InnerWrapper>
			</div>
			<RightSide>
				<FontAwesomeIcon
					title='Take a bite out of that, Boogin'
					icon={quiz.favorite ? faCookieBite : faCookie}
					color={quiz.favorite ? '#875818' : '#b2b2b2'}
					style={{ cursor: 'pointer' }}
					onClick={handleFavoriteToggle}
				/>
				<Score noScore={quiz.score === null}>
					{quiz.score === null ? '--' : quiz.score}/{quiz.question_count}
				</Score>
			</RightSide>
		</Wrapper>
	);
};

export default Quiz;