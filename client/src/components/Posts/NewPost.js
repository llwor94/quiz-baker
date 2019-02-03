import React, { useState, useEffect, useContext, Fragment } from 'react';
import { Transition } from 'react-transition-group';

import server from 'server';

import { PostsCtx } from 'pages/Forum';
import { QuizPostCtx } from 'containers/Quiz';

import { ModalWrapper } from 'styles/Settings/CreateQuiz';
import { NewPostWrapper, InnerWrapper } from 'styles/Posts/NewPost';
import { Button } from 'styles/Components/Button';
import { Input, EmojiTextArea } from 'styles/Components/Input';
import { StyledAutoComplete } from 'styles/Components/Autocomplete';

const Wrapper = ({ userPage, children, styles }) => {
	if (userPage)
		return (
			<ModalWrapper>
				<div className='modal'>{children}</div>
			</ModalWrapper>
		);
	else
		return (
			<div className='inner' styles={styles}>
				{children}
			</div>
		);
};

const NewPost = ({ userPage, quiz, newComment, setNewComment }) => {
	const [ posts, setPosts ] = useContext(PostsCtx);
	const [ newPost, setNewPost ] = useState(false);
	const [ post, setPost ] = useState({ title: '', body: '' });
	const [ topic, setTopic ] = useState('');
	const [ quizPosts, setQuizPosts ] = useContext(QuizPostCtx);
	const [ topics, setTopics ] = useState(undefined);
	const [ searchTopics, setSearchOptions ] = useState(null);

	useEffect(() => {
		server.get('/quizzes/topics').then(({ data }) => {
			setTopics(data);
			setSearchOptions(data);
		});
		if (quiz) {
			setNewPost(true);
		}
	}, []);

	// useEffect(
	// 	() => {
	// 		if (newComment) {
	// 			setNewPost(true);
	// 		}
	// 	},
	// 	[ newComment ],
	// );

	let input = React.createRef();
	useEffect(
		() => {
			if (newPost) {
				input.current.focus();
			}
		},
		[ newPost ],
	);
	const handleBlur = e => {
		let currentTarget = e.currentTarget;
		setTimeout(() => {
			if (!currentTarget.contains(document.activeElement)) {
				setNewPost(false);
			}
		}, 0);
	};

	const filterTopics = e => {
		setTimeout(() => {
			let results;

			if (e.query.length === 0) {
				results = [ ...topics ];
			} else {
				results = topics.filter(topic => {
					return topic.name.toLowerCase().startsWith(e.query.toLowerCase());
				});
			}
			setSearchOptions(results);
		}, 250);
	};

	const handleSelect = e => {
		setTopic(e.value.name);
	};

	const handleEmojiSelect = e => {
		setPost({ ...post, body: post.body + e.native });
	};
	const addPost = () => {
		if (quiz) {
			post.quiz = quiz.id;
		} else {
			post.topic = topic;
		}
		server
			.post('/posts', post)
			.then(() => {
				setPost({ title: '', body: '' });

				if (quiz) {
					server
						.get(`/quizzes/${quiz.id}/posts`)
						.then(({ data }) => {
							console.log(data);
							setQuizPosts(data.sort((a, b) => b.id - a.id));
						})
						.catch(error => console.log(error));
				} else {
					server
						.get('/posts')
						.then(({ data }) => {
							setPosts(data.sort((a, b) => b.id - a.id));
						})
						.catch(error => console.log(error));
				}
				setNewPost(false);
			})
			.catch(error => console.log(error));
	};
	const transitionStyles = {
		entering: { opacity: 0, transform: 'translateY(-250px)' },
		entered: { opacity: 1, transform: 'translateY(0)' },
	};

	return (
		<NewPostWrapper>
			{newPost || newComment ? (
				<Transition in={newPost} appear timeout={400}>
					{state => (
						<Wrapper style={transitionStyles[state]}>
							{!quiz && (
								<StyledAutoComplete
									value={topic}
									suggestions={searchTopics}
									completeMethod={filterTopics}
									placeholder='Topics'
									minLength={1}
									name='topic'
									field='name'
									onSelect={handleSelect}
									dropdown={true}
								/>
							)}
							<Button
								style={{
									position: 'absolute',
									top: quiz ? '5px' : '0px',
									right: quiz ? '5px' : '0px',
								}}
								icon='pi pi-times'
								white
								onClick={() => {
									setNewPost(false);
									setNewComment(false);
								}}
							/>

							<InnerWrapper userPage={userPage}>
								<Input
									inputRef={input}
									value={post.title}
									onChange={e => setPost({ ...post, title: e.target.value })}
									label='Title'
								/>

								<EmojiTextArea
									handleSelect={handleEmojiSelect}
									value={post.body}
									onChange={e => setPost({ ...post, body: e.target.value })}
								/>

								<Button
									label='Submit'
									disabled={!post.title || !post.body || (!quiz && !topic)}
									onClick={addPost}
								/>
							</InnerWrapper>
						</Wrapper>
					)}
				</Transition>
			) : (
				<Fragment>
					<div />
					{!quiz && <Button label='Create a New Post' onClick={() => setNewPost(true)} />}
				</Fragment>
			)}
		</NewPostWrapper>
	);
};

export default NewPost;
