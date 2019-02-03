import React, { useContext } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCookieBite, faCookie } from '@fortawesome/free-solid-svg-icons';

import server from 'server';

import { PostsCtx } from 'pages/Forum';
import { AuthCtx } from 'auth';
import { ThemeCtx } from 'theme';
import { Growl } from 'styles/Components/Growl';

import {
	PostWrapper,
	CurrentPost,
	BodyWrapper,
	Header,
	FooterWrapper,
	CommentCount,
	Title,
	InnerWrapper,
	Topic,
	LeftSide,
	CurrentWrapper,
	HatWrapper,
} from 'styles/Posts/Post';
import { ProfileIcon } from 'styles/Components/Image';

import spoonfull from 'assets/spoonfull.png';
import spoonpour from 'assets/spoonpour.png';
import hatDark from 'assets/chef-dark.svg';
import hatLight from 'assets/chef.svg';

const Wrapper = ({ children, isCurrent, userPage }) => {
	if (isCurrent)
		return (
			<CurrentWrapper>
				<CurrentPost>{children}</CurrentPost>
			</CurrentWrapper>
		);
	else return <PostWrapper userPage={userPage}>{children}</PostWrapper>;
};

const Post = ({ post, showComments, currentPost, ...props }) => {
	const [ posts, setPosts ] = useContext(PostsCtx);
	const { user } = useContext(AuthCtx);
	const [ darkMode, setValue ] = useContext(ThemeCtx);
	const growl = React.createRef();

	const handleCopy = () => {
		let value = `http://localhost:3000/forum/${post.id}`;
		navigator.clipboard.writeText(value).then(() => {
			growl.current.show({ severity: 'info', summary: 'Link Copied!' });
		});
	};

	const handleFavoriteToggle = () => {
		server
			.patch(`posts/${post.id}/vote`, { favorite: !post.favorite })
			.then(({ data }) => {
				server.get('/posts').then(({ data }) => {
					setPosts(data.sort((a, b) => b.id - a.id));
				});
			})
			.catch(err => console.log(err));
	};

	const handleVote = val => {
		console.log(post.user_vote, val);
		if (user) {
			let user_vote;
			if (val === post.user_vote) {
				user_vote = 0;
			} else {
				user_vote = val;
			}
			console.log(user_vote);
			server
				.patch(`posts/${post.id}/vote`, { vote: user_vote })
				.then(({ data }) => {
					server.get('/posts').then(({ data }) => {
						setPosts(data.sort((a, b) => b.id - a.id));
					});
				})
				.catch(err => console.log(err));
		}
	};

	return (
		<Wrapper
			isCurrent={post.id === currentPost}
			userPage={props.history.location.pathname === '/user/settings'}
		>
			{user &&
			user.username === post.author && <HatWrapper src={darkMode ? hatDark : hatLight} />}
			<Growl ref={growl} />
			<LeftSide user={user}>
				<i
					className='pi pi-chevron-up'
					style={{
						color: post.user_vote === 1 && '#DC758F',
					}}
					onClick={() => handleVote(1)}
				/>
				<p
					style={{
						color:
							post.user_vote === 1 ? '#DC758F' : post.user_vote === -1 && '#E3D3E4',
					}}
				>
					{post.votes}
				</p>
				<i
					className='pi pi-chevron-down'
					style={{
						color: post.user_vote === -1 && '#E3D3E4',
					}}
					onClick={() => handleVote(-1)}
				/>
			</LeftSide>
			<InnerWrapper>
				<Header>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<ProfileIcon src={post.author_img} />
						Posted by <a>{post.author}</a>
						<span style={{ padding: '0 3px' }}>&#8226;</span>
						{moment(post.created_at).fromNow()}
					</div>
					{post.topic && <Topic>{post.topic}</Topic>}
				</Header>
				<BodyWrapper onClick={() => props.history.push(`/forum/${post.id}`)}>
					<Title>{post.title}</Title>

					<p>{post.body}</p>
				</BodyWrapper>

				<FooterWrapper isCollapsed={currentPost && currentPost === post.id}>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<CommentCount>
							{post.comment_count === 1 ? (
								'1 comment'
							) : (
								`${post.comment_count} comments`
							)}
						</CommentCount>

						<i className='pi pi-share-alt' onClick={handleCopy} />
						{user ? (
							<FontAwesomeIcon
								title='Take a bite out of that, Boogin'
								icon={post.favorite ? faCookieBite : faCookie}
								color={post.favorite ? '#875818' : '#b2b2b2'}
								style={{ cursor: 'pointer' }}
								className='cookie'
								onClick={handleFavoriteToggle}
							/>
						) : (
							<div />
						)}
					</div>
					{post.comment_count > 0 && (
						<div className='expandComments'>
							{currentPost && currentPost === post.id ? (
								<img onClick={showComments} src={spoonpour} />
							) : (
								<img onClick={showComments} src={spoonfull} />
							)}
						</div>
					)}
				</FooterWrapper>
			</InnerWrapper>
		</Wrapper>
	);
};

export default Post;
