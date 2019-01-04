import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AutoComplete } from 'primereact/autocomplete';
import { ProgressSpinner } from 'primereact/progressspinner';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

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

	const handleCreateQuiz = () => {
		createQuiz({ title: quizName, topic: topic.name });
	};
	if (topics)
		return (
			<div>
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
				<div> {topic.name ? `Topic is ${topic.name}` : 'Please choose a topic'}</div>

				<div>
					Please name your quiz.
					<InputText
						disabled={props.newQuiz || props.newQuizLoading}
						value={quizName}
						onChange={e => setQuizName(e.target.value)}
					/>
					<div>quiz name is {quizName}</div>
				</div>

				{topic.name &&
				quizName && (
					<Button
						label='Create Quiz?'
						disabled={props.newQuiz || props.newQuizLoading}
						className='p-button-raised p-button-secondary'
						onClick={handleCreateQuiz}
					/>
				)}
				{props.newQuizLoading && <div>Creating Your Quiz...</div>}
				{props.newQuiz && (
					<div>
						New Quiz {quizName} Created!{' '}
						<Button
							label='Create Questions'
							icon='pi pi-arrow-right'
							iconPos='right'
							onClick={() =>
								props.history.push(`/quizzes/create/${props.newQuiz.id}`)}
						/>
					</div>
				)}
			</div>
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
