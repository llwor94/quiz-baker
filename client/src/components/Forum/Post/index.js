import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Link } from 'react-router-dom';

const PostWrapper = styled.div`
	padding-left: 8px;
	border-radius: 4px;
	border: 1px solid black;
	position: relative;
	margin-bottom: 10px;
`;
const InnerWrapper = styled.div`
	padding-top: 8px;
	margin: 0 8px;
`;

const PostTitle = styled(Link)`
  font-size: 18px;
		font-weight: 500;
		line-height: 22px;
`;

const BodyWrapper = styled.div`
	max-height: 250px;
	overflow: hidden;
	p {
		font-size: 14px;
		font-weight: 400;
		line-height: 21px;
		mask-image: linear-gradient(180deg, #000 60%, transparent);
	}
`;
const Header = styled.div`
	font-size: 12px;
	font-weight: 400;
	line-height: 16px;
	display: flex;
	margin-bottom: 8px;
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
		color: inherit;
		cursor: pointer;
		padding: initial;
	}
`;

export const Post = ({ post: { id, title, author, body, created_at } }) => {
	return (
		<PostWrapper key={id}>
			<InnerWrapper>
				<Header>
					Posted by {author} {moment(created_at).fromNow()}
				</Header>
				<PostTitle to={`/forum/${id}`}>{title}</PostTitle>
				<BodyWrapper>
					<p>{body}</p>
				</BodyWrapper>
				<FooterWrapper>
					<button>Share</button>
					<button>Save</button>
				</FooterWrapper>
			</InnerWrapper>
		</PostWrapper>
	);
};

const Wrapper = styled.div`
	width: 100%;
	padding: 20px 24px;
	display: flex;
	justify-content: center;
`;

const InnerForumWrapper = styled.div`width: 648px;`;

export const ForumWrapper = ({ children }) => (
	<Wrapper>
		<InnerForumWrapper>{children}</InnerForumWrapper>
	</Wrapper>
);
