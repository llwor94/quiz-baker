import React, { useEffect, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';

import server from 'server';

import { Input, TextArea } from 'styles/Components/Input';
import { StyledAutoComplete } from 'styles/Components/Autocomplete';
import { QuizFormWrapper } from 'styles/Settings/QuizForm';

const QuizForm = ({ quiz, setQuiz, ...props }) => {
	const [ topics, setTopics ] = useState(undefined);
	const [ searchTopics, setSearchOptions ] = useState(null);

	const options = [
		{ label: '15 sec', value: 15 },
		{ label: '30 sec', value: 30 },
		{ label: '45 sec', value: 45 },
		{ label: '1 min', value: 60 },
	];

	useEffect(() => {
		server.get('/quizzes/topics').then(({ data }) => {
			setTopics(data);
			setSearchOptions(data);
		});
	}, []);

	const handleChange = e => {
		let value;
		if (e.target.value.name) {
			value = e.target.value.name;
		} else {
			value = e.target.value;
		}
		setQuiz({ ...quiz, [e.target.name]: value });
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

	return (
		<QuizFormWrapper create={props.create}>
			<div style={{ display: 'flex' }}>
				<div>
					<p>Title:</p>
					<Input name='title' value={quiz.title} onChange={handleChange} />
					<p>Question Time Limit (optional):</p>
					<Dropdown
						name='question_time_limit'
						value={quiz.question_time_limit}
						options={options}
						onChange={handleChange}
					/>
					<p style={{ marginBottom: '10px' }}>Topic:</p>
					<StyledAutoComplete
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
				</div>
			</div>

			<p style={{ marginBottom: '10px' }}>Description:</p>
			<TextArea
				name='description'
				rows={5}
				cols={30}
				value={quiz.description}
				onChange={handleChange}
			/>
		</QuizFormWrapper>
	);
};

export default QuizForm;
