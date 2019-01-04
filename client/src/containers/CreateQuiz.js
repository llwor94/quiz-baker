import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AutoComplete } from 'primereact/autocomplete';
import { ProgressSpinner } from 'primereact/progressspinner';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import { CreateNewQuiz } from '../components/Quizzes/Quiz/create';
import { fetchTopics, createQuiz } from '../store/actions/quizActions';

const CreateQuiz = ({ fetchTopics, topics, createQuiz, ...props }) => {
	const [ topic, setTopic ] = useState({});
	const [ searchTopics, setSearchOptions ] = useState(null);

	const [ quizName, setQuizName ] = useState(undefined);

	useEffect(() => {
		fetchTopics();
	}, []);

	useEffect(
		() => {
			if (topics) {
				setSearchOptions(topics);
			}
		},
		[ topics ],
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

	const handleGoToEdit = () => {
		props.history.push(`/quizzes/edit/${props.newQuiz.id}`);
	};

	const handleCreateQuiz = () => {
		createQuiz({ title: quizName, topic: topic.name });
	};

	if (topics)
		return (
			<CreateNewQuiz
				buttonDisabled={props.newQuiz || props.newQuizLoading || !topic.name || !quizName}
				handleCreateQuiz={handleCreateQuiz}
				handleGoToEdit={handleGoToEdit}
				topic={topic}
				quizName={quizName}
				newQuiz={props.newQuiz}
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

				{props.newQuizLoading && <div>Creating Your Quiz...</div>}
			</CreateNewQuiz>
		);
	else return <ProgressSpinner />;
};

const mapStateToProps = ({ quizReducer }) => ({
	loading: quizReducer.loading,
	topics: quizReducer.topics,
	newQuizLoading: quizReducer.newQuizLoading,
	newQuiz: quizReducer.newQuiz,
	error: quizReducer.error,
});

export default connect(mapStateToProps, { fetchTopics, createQuiz })(CreateQuiz);
