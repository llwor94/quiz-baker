import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AutoComplete } from 'primereact/autocomplete';
import { InputText } from 'primereact/inputtext';

import axios from 'axios';
import _ from 'lodash';

import { CreateNewQuiz, CreateQuizButton } from '../../components/Quizzes/Quiz/create';
import { fetchTopics, fetchUserQuizzes } from '../../store/actions/quizActions';

const CreateQuiz = ({ fetchTopics, topics, fetchUserQuizzes, token, ...props }) => {
	const [ newQuiz, setNewQuiz ] = useState(false);
	const [ quiz, setQuiz ] = useState({ title: '', description: '', topic: '' });

	const [ searchTopics, setSearchOptions ] = useState(null);

	useEffect(() => {
		setSearchOptions(topics);
	}, []);

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

	const handleChange = e => {
		let value;
		if (e.target.value.name) {
			value = e.target.value.name;
		} else {
			value = e.target.value;
		}
		setQuiz({ ...quiz, [e.target.name]: value });
	};

	const handleCreateQuiz = () => {
		axios({
			method: 'post',
			url: 'https://lambda-study-app.herokuapp.com/api/quizzes',
			headers: {
				authorization: token,
			},
			data: quiz,
		})
			.then(response => {
				fetchUserQuizzes();
				setQuiz(_.mapValues(quiz, ''));
				setNewQuiz(false);
			})
			.catch(error => console.log(error));
	};

	if (!newQuiz) return <CreateQuizButton handleClick={() => setNewQuiz(true)} />;
	else
		return (
			<CreateNewQuiz
				buttonDisabled={!quiz.title || !quiz.topic}
				handleSubmit={handleCreateQuiz}
				quiz={quiz}
				handleClose={() => setNewQuiz(false)}
			>
				<p>Please choose a topic or create your own.</p>
				<AutoComplete
					value={quiz.topic}
					suggestions={searchTopics}
					completeMethod={filterTopics}
					placeholder='Topics'
					minLength={1}
					name='topic'
					field='name'
					onChange={handleChange}
					dropdown={true}
				/>

				<p>Please name your quiz</p>
				<InputText name='title' value={quiz.title} onChange={handleChange} />
				<p>Set a description for your quiz.</p>
				<textarea
					name='description'
					rows={5}
					cols={30}
					value={quiz.description}
					onChange={handleChange}
					autoResize={true}
				/>
			</CreateNewQuiz>
		);
};

const mapStateToProps = ({ quizReducer, authReducer }) => ({
	loading: quizReducer.loading,
	topics: quizReducer.topics,
	error: quizReducer.error,
	token: authReducer.token,
});

export default connect(mapStateToProps, { fetchTopics, fetchUserQuizzes })(CreateQuiz);
