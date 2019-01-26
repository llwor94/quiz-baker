import React, { useEffect, useState, Fragment } from 'react';
import { Spinner } from 'primereact/spinner';
import server from '../../utils/server';
import { Input, TextArea } from '../../Styles/Components/Input';
import { StyledAutoComplete } from '../../Styles/Components/Autocomplete';
import { QuizFormWrapper } from '../../Styles/Settings/QuizForm';

const QuizForm = ({ quiz, setQuiz, ...props }) => {
	const [ topics, setTopics ] = useState(undefined);
	const [ searchTopics, setSearchOptions ] = useState(null);

	useEffect(() => {
		server.get('/quizzes/topics').then(({ data }) => {
			setTopics(data);
			setSearchOptions(data);
		});
	}, []);

	const handleChange = e => {
		let value;
		console.log(e);
		if (e.target.value.name) {
			value = e.target.value.name;
		} else {
			value = e.target.value;
		}

		setQuiz({ ...quiz, [e.target.name]: value });
	};
	console.log(quiz);
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
		<QuizFormWrapper>
			<div style={{ display: 'flex' }}>
				<div>
					<p>Title:</p>
					<Input name='title' value={quiz.title} onChange={handleChange} />
					<p>Time Limit (optional):</p>
					<Spinner
						name='time_limit_seconds'
						value={quiz.time_limit_seconds}
						step={0.25}
						onChange={handleChange}
						tooltip='in minutes'
						tooltipOptions={{ position: 'bottom' }}
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
