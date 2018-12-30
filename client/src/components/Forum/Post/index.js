import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Editor } from 'primereact/editor';

export const PostWrapper = styled.div`
	padding-left: 8px;
	border-radius: 4px;
	border: 1px solid;
	border-color: ${props => props.theme.accent};
	position: relative;
	margin-bottom: 10px;
	background-color: ${props => props.theme.secondary};

	&:hover {
		border-color: rgb(129, 131, 132);
	}
`;
const InnerWrapper = styled.div`
	padding-top: 8px;
	margin: 0 8px;
`;

const PostTitle = styled.div`
	font-size: 18px;
	font-weight: 500;
	line-height: 22px;
	cursor: pointer;
	color: ${props => props.theme.text};
`;

const BodyWrapper = styled.div`
	max-height: 250px;
	overflow: hidden;
	p {
		font-size: 14px;
		font-weight: 400;
		line-height: 21px;
		mask-image: linear-gradient(180deg, #000 60%, transparent);
		color: ${props => props.theme.text};
	}
`;
const Header = styled.div`
	font-size: 12px;
	font-weight: 400;
	line-height: 16px;
	display: flex;
	margin-bottom: 8px;
	color: ${props => props.theme.link};
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

export const Post = ({
	post: { title, author, body, created_at, comment_count },
	handleClick,
	children,
}) => {
	return (
		<PostWrapper>
			<InnerWrapper>
				<Header>
					Posted by {author.username ? author.username : author}
					{moment(created_at).fromNow()}
				</Header>
				<PostTitle onClick={handleClick}>{title}</PostTitle>
				<BodyWrapper>
					<p>{body}</p>
				</BodyWrapper>
				<FooterWrapper>
					<button>{comment_count} comments</button>
					<button>Share</button>
					<button>Save</button>
				</FooterWrapper>
			</InnerWrapper>
			{children}
		</PostWrapper>
	);
};
