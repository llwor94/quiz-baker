import React from 'react';
import styled from 'styled-components';

const QuizWrapper = styled.div`
	border-radius: 4px;
	border: 1px solid;
	border-color: ${props => props.theme.accent};
	display: flex;
	background-color: ${props => props.theme.secondary};
	margin-bottom: 10px;
	font-family: 'IBM Plex Sans', sans-serif;
	&:hover {
		border-color: rgb(129, 131, 132);
	}
`;

const SideBar = styled.div`
	width: 40px;

	justify-content: center;
	align-items: center;
	display: flex;
	background-color: transparent;
	opacity: 80%;
	color: ${props => props.theme.text};
`;
const InnerWrapper = styled.div`
	padding: 8px;
	flex-grow: 1;
	max-width: 606px;
`;

const Header = styled.div`
	font-size: 12px;
	font-weight: 400;
	line-height: 16px;
	display: flex;
	margin-bottom: 8px;
	color: ${props => props.theme.link};
`;
const Topic = styled.a`
	font-weight: 700;
	color: ${props => props.theme.text};
	padding-right: 5px;
`;

const Title = styled.div`
	font-size: 18px;
	font-weight: 500;
	line-height: 22px;
	cursor: pointer;
	color: ${props => props.theme.text};
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
const FooterWrapper = styled.div`
	display: flex;
	align-items: center;
	font-size: 12px;
	font-weight: 700;
	button {
		width: auto;
		height: 25px;
		white-space: nowrap;
		padding-right: 4px;
		margin-right: 4px;
		text-transform: capitalize;
		overflow-wrap: initial;
		word-break: initial;
		border-radius: 2px;
		transition: background-color 0.1s ease 0s;
		background: transparent;
		border: none;
		color: ${props => props.theme.accentText};
		cursor: pointer;
		padding: initial;
	}
`;
export const Quiz = ({ quiz }) => {
	console.log(quiz);
	return (
		<QuizWrapper>
			<SideBar>
				<p>{quiz.votes}</p>
			</SideBar>
			<InnerWrapper>
				<Header>
					<Topic>{quiz.topic}</Topic>
					Created by {quiz.author}
				</Header>
				<Title>{quiz.title}</Title>
				{quiz.description && (
					<DescriptionWrapper>
						<p>{quiz.description}</p>
					</DescriptionWrapper>
				)}
				<FooterWrapper>
					<button>{quiz.question_count} questions</button>
					<button>Share</button>
					<button>Save</button>
				</FooterWrapper>
			</InnerWrapper>
		</QuizWrapper>
	);
};
