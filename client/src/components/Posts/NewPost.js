import React, { useState, useEffect, useContext, Fragment } from 'react';

import { PostsCtx } from '../../pages/Forum';
import { NewPostWrapper, InnerWrapper } from '../../Styles/Posts/NewPost';
import { Button } from '../../Styles/Components/Button';
import { Input, TextArea, EmojiTextArea } from '../../Styles/Components/Input';
import server from '../../utils/server';
import { QuizPostCtx } from '../../containers/Quiz';
import { StyledAutoComplete } from '../../Styles/Components/Autocomplete';

const NewPost = ({ userPage, quiz }) => {
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
	}, []);

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
		console.log(e.value.id);
		setTopic(e.value.name);
	};

	const handleEmojiSelect = e => {
		console.log(e);
		setPost({ ...post, body: post.body + e.native });
	};
	const addPost = () => {
		if (quiz) {
			post.quiz = quiz.id;
		} else {
			post.topic = topic;
		}
		console.log(post);
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

	return (
		<NewPostWrapper userPage={userPage}>
			{newPost ? (
				<Fragment>
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
					<Button
						style={{ position: 'absolute', top: '0px', right: '0px' }}
						icon='pi pi-times'
						white
						onClick={() => setNewPost(false)}
					/>

					<InnerWrapper>
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
							disabled={!post.title || !post.body}
							onClick={addPost}
						/>
					</InnerWrapper>
				</Fragment>
			) : (
				<Button
					label='Create a New Post'
					onClick={() => setNewPost(true)}
					style={{ position: 'absolute', top: '0px', right: '0px' }}
				/>
			)}
		</NewPostWrapper>
	);
};

export default NewPost;
