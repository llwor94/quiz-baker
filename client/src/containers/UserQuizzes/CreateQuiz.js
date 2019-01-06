import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AutoComplete } from 'primereact/autocomplete';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import axios from 'axios';

import { CreateNewQuiz, CreateQuizButton } from '../../components/Quizzes/Quiz/create';
import { fetchTopics, fetchUserQuizzes } from '../../store/actions/quizActions';

const CreateQuiz = ({ fetchTopics, topics, fetchUserQuizzes, token, ...props }) => {
	const [ newQuiz, setNewQuiz ] = useState(false);
	const [ topic, setTopic ] = useState({});
	const [ searchTopics, setSearchOptions ] = useState(null);
	const [ description, setDescription ] = useState('');

	const [ quizName, setQuizName ] = useState(undefined);

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

	const handleGoToEdit = () => {
		props.history.push(`/quizzes/edit/${props.newQuiz.id}`);
	};

	const handleCreateQuiz = () => {
		axios({
			method: 'post',
			url: 'https://lambda-study-app.herokuapp.com/api/quizzes',
			headers: {
				authorization: token,
			},
			data: { title: quizName, topic: topic.name, description: description },
		})
			.then(response => {
				console.log(response);
				fetchUserQuizzes();
				setTopic({});
				setDescription('');
				setQuizName('');
				setNewQuiz(false);
			})
			.catch(error => console.log(error));
	};

	if (!newQuiz) return <CreateQuizButton handleClick={() => setNewQuiz(true)} />;
	else
		return (
			<CreateNewQuiz
				buttonDisabled={props.newQuiz || props.newQuizLoading || !topic.name || !quizName}
				handleCreateQuiz={handleCreateQuiz}
				handleGoToEdit={handleGoToEdit}
				topic={topic}
				quizName={quizName}
				newQuiz={props.newQuiz}
				handleClose={() => setNewQuiz(false)}
			>
				<p>Please choose a topic or create your own.</p>
				<AutoComplete
					value={topic.name}
					suggestions={searchTopics}
					completeMethod={filterTopics}
					placeholder='Topics'
					minLength={1}
					field='name'
					disabled={props.newQuiz || props.newQuizLoading}
					onSelect={e => setTopic({ name: e.value.name })}
					onChange={e => setTopic({ name: e.value })}
					dropdown={true}
				/>

				<p>Please name your quiz</p>
				<InputText
					disabled={props.newQuiz || props.newQuizLoading}
					value={quizName}
					onChange={e => setQuizName(e.target.value)}
				/>
				<p>Set a description for your quiz.</p>
				<InputTextarea
					rows={5}
					cols={30}
					value={description}
					onChange={e => setDescription(e.target.value)}
					autoResize={true}
				/>

				{props.newQuizLoading && <div>Creating Your Quiz...</div>}
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
