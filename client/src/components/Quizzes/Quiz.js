import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCookieBite, faCookie } from '@fortawesome/free-solid-svg-icons';
import { withTheme } from 'styled-components';

import server from 'server';

import { AuthCtx } from 'auth';
import { ThemeCtx } from 'theme';
import { QuizzesCtx } from 'pages/Quizzes';

import {
	Wrapper,
	HatWrapper,
	LeftSide,
	InnerWrapper,
	Title,
	Header,
	Topic,
	User,
	Score,
	DescriptionWrapper,
	UserNameWrapper,
	RightSide,
	QuestionCount,
	FooterWrapper,
} from 'styles/Quizzes/Quiz';
import { ProfileIcon } from 'styles/Components/Image';
import { Growl } from 'styles/Components/Growl';

import hatIcon from 'assets/chef.svg';
import hatDark from 'assets/chef-dark.svg';
import { animateIn, animateOut, bounceUp } from 'styles/animations';

const Quiz = ({ quiz, ...props }) => {
	const growl = React.createRef();
	const [ quizzes, setQuizzes ] = useContext(QuizzesCtx);
	const { user } = useContext(AuthCtx);
	const [ darkMode, setValue ] = useContext(ThemeCtx);

	const handleCopy = () => {
		let value = `http://localhost:3000/quizzes/${quiz.id}`;
		navigator.clipboard.writeText(value).then(() => {
			growl.current.show({ severity: 'info', summary: 'Link Copied!' });
		});
	};

	const handleFavoriteToggle = () => {
		server
			.patch(`quizzes/${quiz.id}`, { favorite: !quiz.favorite })
			.then(({ data }) => {
				server.get('/quizzes').then(({ data }) => {
					setQuizzes(
						data.filter(quiz => quiz.question_count).sort((a, b) => b.id - a.id),
					);
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
						setQuizzes(
							data.filter(quiz => quiz.question_count).sort((a, b) => b.id - a.id),
						);
					});
				})
				.catch(err => console.log(err));
		}
	};

	return (
		<Wrapper>
			<Growl ref={growl} style={{ top: '70px', color: 'white' }} />
			{user &&
			user.username === quiz.author &&
			props.history.location.pathname === '/quizzes' && (
				<HatWrapper src={darkMode ? hatDark : hatIcon} />
			)}
			<div style={{ display: 'flex' }}>
				<LeftSide user={user} className='voting'>
					<i
						className={`pi pi-chevron-up up-${quiz.id}`}
						style={{
							color: quiz.user_vote === 1 && '#DC758F',
						}}
						onClick={() => handleVote(1)}
						onMouseEnter={bounceUp(`.voting .up-${quiz.id}`).play}
						onMouseLeave={bounceUp(`.voting .up-${quiz.id}`).pause}
					/>
					<p
						style={{
							color:
								quiz.user_vote === 1
									? '#DC758F'
									: quiz.user_vote === -1 && '#E3D3E4',
						}}
					>
						{quiz.votes}
					</p>
					<i
						className='pi pi-chevron-down'
						style={{
							color: quiz.user_vote === -1 && '#E3D3E4',
						}}
						onClick={() => handleVote(-1)}
					/>
				</LeftSide>
				<InnerWrapper>
					<div>
						<Header>
							<div>
								<Title onClick={() => props.history.push(`quizzes/${quiz.id}`)}>
									{quiz.title}
								</Title>
								{quiz.question_time_limit && <i className='pi pi-clock' />}
								{quiz.post_count > 0 && (
									<i
										postCount={quiz.post_count}
										className='pi pi-comments'
										style={{ cursor: 'default' }}
									/>
								)}
							</div>
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
						<UserNameWrapper className='icon-wrapper'>
							<ProfileIcon src={quiz.author_img} />
							<span>
								Created by <User>{quiz.author}</User>
							</span>

							<i
								name={`share-${quiz.id}`}
								className={`pi pi-share-alt share-${quiz.id}`}
								onClick={handleCopy}
								onMouseEnter={e => animateIn(e, props.theme.aqua)}
								onMouseLeave={e => animateOut(e, props.theme.link)}
							/>
							{user ? (
								<FontAwesomeIcon
									name={`favorite-${quiz.id}`}
									className={`cookie favorite-${quiz.id} `}
									title='Take a bite out of that, Boogin'
									icon={quiz.favorite ? faCookieBite : faCookie}
									color={quiz.favorite ? '#875818' : '#b2b2b2'}
									onClick={handleFavoriteToggle}
									onMouseEnter={e => animateIn(e, props.theme.aqua)}
									onMouseLeave={e =>
										animateOut(e, quiz.favorite ? '#875818' : '#b2b2b2')}
								/>
							) : (
								<div />
							)}
						</UserNameWrapper>
					</FooterWrapper>
				</InnerWrapper>
			</div>
			<RightSide>
				<Topic>{quiz.topic}</Topic>
				{user ? (
					<Score noScore={quiz.score === null}>
						{quiz.score === null ? '--' : quiz.score}/{quiz.question_count}
					</Score>
				) : (
					<QuestionCount>
						{quiz.question_count} <div className='q'>Q</div>
					</QuestionCount>
				)}
			</RightSide>
		</Wrapper>
	);
};

export default withTheme(Quiz);
