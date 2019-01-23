import React, { useState, useEffect, useContext, Fragment } from 'react';
import { ModalWrapper } from '../../Styles/Settings/CreateQuiz';
import { PostsCtx } from '../../pages/Forum';
import { NewPostWrapper, InnerWrapper } from '../../Styles/Posts/NewPost';
import { Button } from '../../Styles/Components/Button';
import { Input, TextArea, EmojiTextArea } from '../../Styles/Components/Input';
import server from '../../utils/server';
import { UserCtx } from '../../App';
import { StyledAutoComplete } from '../../Styles/Components/Autocomplete';
import { UserPostsCtx } from '../../pages/Settings';

const CreatePost = () => {
	const [ newPost, setNewPost ] = useState(false);
	const [ post, setPost ] = useState({ title: '', body: '' });
	const [ topic, setTopic ] = useState('');
	const [ user, setUser ] = useContext(UserCtx);
	const [ topics, setTopics ] = useState(undefined);
	const [ searchTopics, setSearchOptions ] = useState(null);
	const [ userPosts, setUserPosts ] = useContext(UserPostsCtx);
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
		post.topic = topic;

		console.log(post);
		server
			.post('/posts', post)
			.then(() => {
				setPost({ title: '', body: '' });

				server
					.get('/posts')
					.then(({ data }) => {
						setUserPosts(
							data
								.filter(post => post.author === user.username)
								.sort((a, b) => b.id - a.id),
						);
					})
					.catch(error => console.log(error));

				setNewPost(false);
			})
			.catch(error => console.log(error));
	};

	return (
		<NewPostWrapper userPage>
			{newPost ? (
				<ModalWrapper>
					<div className='modal'>
						<Button
							style={{ position: 'absolute', top: '0px', right: '0px' }}
							icon='pi pi-times'
							white
							onClick={() => setNewPost(false)}
						/>
						<InnerWrapper userPage>
							<Input
								inputRef={input}
								value={post.title}
								onChange={e => setPost({ ...post, title: e.target.value })}
								label='Title'
							/>
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
							<EmojiTextArea
								handleSelect={handleEmojiSelect}
								value={post.body}
								onChange={e => setPost({ ...post, body: e.target.value })}
							/>

							<Button
								label='Submit'
								disabled={!post.title || !post.body || !topic}
								onClick={addPost}
							/>
						</InnerWrapper>
					</div>
				</ModalWrapper>
			) : (
				<Fragment>
					<div />
					<Button label='Create a New Post' onClick={() => setNewPost(true)} />
				</Fragment>
			)}
		</NewPostWrapper>
	);
};

export default CreatePost;
