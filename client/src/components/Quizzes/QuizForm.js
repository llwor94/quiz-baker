import React, { useEffect, useState, Fragment } from 'react';

import { Input, TextArea } from '../../components/Styles/Input';
import { StyledAutoComplete } from '../../components/Styles/Text/autoComplete';

const QuizForm = ({ topics, quiz, setQuiz, ...props }) => {
	const [ searchTopics, setSearchOptions ] = useState(null);

	useEffect(() => {
		setSearchOptions(topics);
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
		<Fragment>
			<p>Please choose a topic or create your own.</p>
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

			<p>Please name your quiz</p>
			<Input name='title' value={quiz.title} onChange={handleChange} />
			<p>Set a description for your quiz.</p>
			<TextArea
				name='description'
				rows={5}
				cols={30}
				value={quiz.description}
				onChange={handleChange}
			/>
		</Fragment>
	);
};

export default QuizForm;
