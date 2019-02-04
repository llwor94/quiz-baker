import React, { useContext, Fragment } from 'react';
import moment from 'moment';
import MediaQuery from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCookieBite, faCookie } from '@fortawesome/free-solid-svg-icons';
import { withTheme } from 'styled-components';
import anime from 'animejs';

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
import { animateIn, animateOut } from 'styles/animations';

import spoonfull from 'assets/spoonfull.png';
import spoonpour from 'assets/spoonpour.png';
import hatDark from 'assets/chef-dark.svg';
import hatLight from 'assets/chef.svg';

const Wrapper = ({ children, isCurrent, userPage, ...props }) => {
	if (isCurrent)
		return (
			<Fragment>
				<MediaQuery minWidth={1000}>
					<CurrentWrapper>
						<CurrentPost>{children}</CurrentPost>
					</CurrentWrapper>
				</MediaQuery>
				<MediaQuery maxWidth={999}>
					<PostWrapper userPage={userPage}>{children}</PostWrapper>
				</MediaQuery>
			</Fragment>
		);
	else return <PostWrapper userPage={userPage}>{children}</PostWrapper>;
};

const Post = ({ post, showComments, currentPost, ...props }) => {
	const [ posts, setPosts ] = useContext(PostsCtx);
	const { user } = useContext(AuthCtx);
	const [ darkMode, setValue ] = useContext(ThemeCtx);
	const growl = React.createRef();
	const bounceUp = anime({
		targets: `.voting .up-${post.id}`,
		translateY: -5,
		direction: 'alternate',
		loop: true,
		duration: 200,
		autoplay: false,
		easing: 'easeInOutSine',
	});

	const bounceDown = anime({
		targets: `.voting .down-${post.id}`,
		translateY: 5,
		direction: 'alternate',
		loop: true,
		duration: 200,
		autoplay: false,
		easing: 'easeInOutSine',
	});

	const handleCopy = () => {
		let value = `http://www.quiz-baker.com/forum/${post.id}`;
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
		if (user) {
			let user_vote;
			if (val === post.user_vote) {
				user_vote = 0;
			} else {
				user_vote = val;
			}

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
			<LeftSide user={user} className='voting'>
				<i
					className={`pi pi-chevron-up up-${post.id}`}
					style={{
						color: post.user_vote === 1 && '#DC758F',
					}}
					onClick={() => handleVote(1)}
					onMouseEnter={bounceUp.play}
					onMouseLeave={() => {
						bounceUp.pause();
						bounceUp.seek(0);
					}}
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
					className={`pi pi-chevron-down down-${post.id}`}
					style={{
						color: post.user_vote === -1 && '#E3D3E4',
					}}
					onClick={() => handleVote(-1)}
					onMouseEnter={bounceDown.play}
					onMouseLeave={() => {
						bounceDown.pause();
						bounceDown.seek(0);
					}}
				/>
			</LeftSide>
			<InnerWrapper>
				<Header>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<ProfileIcon src={post.author_img} />
						Posted by <a href='#author'>{post.author}</a>
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

						<i
							className='pi pi-share-alt'
							onClick={handleCopy}
							onMouseEnter={e => animateIn(e, props.theme.aqua)}
							onMouseLeave={e => animateOut(e, props.theme.link)}
						/>
						{user ? (
							<FontAwesomeIcon
								title='Take a bite out of that, Boogin'
								icon={post.favorite ? faCookieBite : faCookie}
								color={post.favorite ? '#875818' : '#b2b2b2'}
								style={{ cursor: 'pointer' }}
								className='cookie'
								onClick={handleFavoriteToggle}
								onMouseEnter={e => animateIn(e, props.theme.aqua)}
								onMouseLeave={e =>
									animateOut(e, post.favorite ? '#875818' : '#b2b2b2')}
							/>
						) : (
							<div />
						)}
					</div>
					<MediaQuery minWidth={1000}>
						{post.comment_count > 0 && (
							<div className='expandComments'>
								{currentPost && currentPost === post.id ? (
									<img onClick={showComments} src={spoonpour} alt='' />
								) : (
									<img onClick={showComments} src={spoonfull} alt='' />
								)}
							</div>
						)}
					</MediaQuery>
				</FooterWrapper>
			</InnerWrapper>
		</Wrapper>
	);
};

export default withTheme(Post);
