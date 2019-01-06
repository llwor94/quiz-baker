import React from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCookieBite, faCookie } from '@fortawesome/free-solid-svg-icons';

import { Wrapper } from '../../Styles/Wrappers/index';
import { FooterWrapper } from '../../Styles/Wrappers/footer';

const QuizWrapper = styled(Wrapper)`
	display: flex;
	height: ${props => (props.hasDescription ? '200px' : '140px')}
`;

const SideBar = styled.div`
	font-size: 20px;
	width: 40px;
	justify-content: center;
	align-items: center;
	display: flex;
	flex-direction: column;
	background-color: transparent;
	color: ${props => props.theme.text};
	margin: 0 10px;

	i {
		cursor: pointer;
	}
`;

const RightSide = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-end;
	padding: 20px;
	height: 100%;
	font-size: 20px;
	svg {
		font-size: 30px;
	}
`;

const InnerWrapper = styled.div`
	padding: 8px;
	flex-grow: 1;
	max-width: 606px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const Header = styled.div`
	font-size: 30px;
	font-weight: 400;
	line-height: 16px;
	display: flex;
	justify-content: space-between;
	margin-bottom: 8px;
	padding-top: 20px;
	color: ${props => props.theme.link};
	p {
		font-size: 12px;
		margin-top: 6px;
	}
`;
const Title = styled.a`
	font-weight: 700;
	color: ${props => (props.noScore ? '#b2b2b2' : props.theme.text)};
	padding: 0 5px 0 0;
`;

const FooterAccent = styled.div`
	font-size: 18px;
	font-weight: 500;
	cursor: pointer;
	color: ${props => (props.isQuizTopic ? 'white' : props.theme.text)};
	background-color: ${props => (props.isQuizTopic ? 'green' : 'white')};
	margin-right: 10px;
	padding: 5px;
	border-radius: 5px;
`;

const DescriptionWrapper = styled.div`
	overflow: hidden;
	word-wrap: break-word;
	word-break: break-word;
	p {
		font-size: 14px;
		font-weight: 400;
		line-height: 21px;
		word-wrap: break-word;
		word-break: break-word;
		color: ${props => props.theme.text};
	}
`;
export const Quiz = ({ quiz, user, handleClick, handleFavoriteToggle, handleVote, mainPage }) => {
	return (
		<QuizWrapper hasDescription={quiz.description}>
			<SideBar>
				<i
					className='pi pi-chevron-up'
					style={{ color: quiz.user_vote === 1 ? 'red' : 'black' }}
					onClick={() => handleVote(1)}
				/>
				<p style={{ color: quiz.user_vote ? 'red' : 'black' }}>{quiz.votes}</p>
				<i
					className='pi pi-chevron-down'
					style={{ color: quiz.user_vote === -1 ? 'red' : 'black' }}
					onClick={() => handleVote(-1)}
				/>
			</SideBar>
			<InnerWrapper>
				<div>
					<Header>
						<div>
							<Title onClick={handleClick}>{quiz.title}</Title>
							<p>
								Created by{' '}
								{quiz.author.username ? quiz.author.username : quiz.author}
							</p>
						</div>
					</Header>

					{quiz.description && (
						<DescriptionWrapper>
							<p>{quiz.description}</p>
						</DescriptionWrapper>
					)}
				</div>

				<FooterWrapper>
					<FooterAccent isQuizTopic>{quiz.topic}</FooterAccent>
					<button>{quiz.question_count} questions</button>
					<button>Share</button>
					<button>Save</button>
				</FooterWrapper>
			</InnerWrapper>
			{user.id && (
				<RightSide>
					<FontAwesomeIcon
						title='Take a bite out of that, Boogin'
						icon={quiz.favorite ? faCookieBite : faCookie}
						color={quiz.favorite ? '#875818' : '#b2b2b2'}
						style={{ cursor: 'pointer' }}
						onClick={handleFavoriteToggle}
					/>
					<FooterAccent noScore={quiz.score === null}>
						{quiz.score === null ? '--' : quiz.score}/{quiz.question_count}
					</FooterAccent>
				</RightSide>
			)}
		</QuizWrapper>
	);
};
