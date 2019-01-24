import React, { useEffect, useState, useContext } from 'react';
import { QuizzesCtx } from '../../pages/Quizzes';
import { MultiSelect } from 'primereact/multiselect';
import _ from 'lodash';
import server from '../../utils/server';
import { Topic, MultiSelectWrapper } from '../../Styles/Quizzes/Quiz';

const Topics = () => {
	const [ topics, setTopics ] = useState([]);
	const [ selected, setSelected ] = useState([]);
	const [ quizzes, setQuizzes ] = useContext(QuizzesCtx);
	const [ allQuizzes, setAllQuizzes ] = useState(quizzes);

	useEffect(() => {
		server.get('/quizzes/topics').then(({ data }) => {
			setTopics(data.filter(topic => quizzes.some(quiz => quiz.topic === topic.name)));
		});
	}, []);

	useEffect(
		() => {
			console.log(selected);
			setQuizzes(
				allQuizzes.filter(quiz => selected.some(topic => topic.name === quiz.topic)),
			);
		},
		[ selected ],
	);

	const selectedTemplate = value => {
		if (value) {
			return <Topic style={{ margin: '0 2px' }}>{value.name}</Topic>;
		} else return <div>Filter by Topic</div>;
	};

	return (
		<MultiSelectWrapper>
			<MultiSelect
				optionLabel='name'
				value={selected}
				options={topics}
				onChange={e => setSelected(e.value)}
				filter={true}
				selectedItemTemplate={selectedTemplate}
			/>
		</MultiSelectWrapper>
	);
};

export default Topics;