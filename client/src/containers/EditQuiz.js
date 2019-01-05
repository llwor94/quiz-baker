import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';

import { InputText } from 'primereact/inputtext';
import { AutoComplete } from 'primereact/autocomplete';
import { fetchQuizForEdit, fetchTopics, editQuiz } from '../store/actions/quizActions';
import { fetchQuizQuestions } from '../store/actions/questionActions';
import { EditUserQuiz } from '../components/Quizzes/Quiz/edit';

const EditQuiz = ({ quiz, topics, ...props }) => {
	const [ searchTopics, setSearchOptions ] = useState(null);
	const [ quizName, setQuizName ] = useState('');
	const [ topic, setTopic ] = useState({});

	const [ edit, setEdit ] = useState(false);

	useEffect(() => {
		setQuizName(quiz.title);
		setTopic({ name: quiz.topic });
		setSearchOptions(topics);
	}, []);

	useEffect(
		() => {
			setQuizName(quiz.title);
			setTopic({ name: quiz.topic });
			setEdit(false);
		},
		[ quiz ],
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

	const handleQuizEdit = () => {
		if (!edit) setEdit(true);
		else {
			if (quizName !== quiz.title || topic.name.toLowerCase() !== quiz.topic.toLowerCase()) {
				props.editQuiz({ title: quizName, topic: topic.name });
			}
		}
	};

	return (
		<EditUserQuiz
			quiz={props.edittingQuiz}
			edit={edit}
			setEdit={setEdit}
			topics={props.topics}
			handleClick={handleQuizEdit}
			loading={props.loading}
		>
			<InputText value={quizName} onChange={e => setQuizName(e.target.value)} />
			<AutoComplete
				value={topic.name}
				suggestions={searchTopics}
				completeMethod={filterTopics}
				placeholder='Topics'
				minLength={1}
				field='name'
				onSelect={e => setTopic({ name: e.value.name })}
				onChange={e => setTopic({ name: e.value })}
				dropdown={true}
			/>
		</EditUserQuiz>
	);
};

const mapStateToProps = ({ quizReducer, questionReducer }) => ({
	edittingQuiz: quizReducer.edittingQuiz,
	loading: quizReducer.loading,
	error: quizReducer.error,
	questions: questionReducer.questions,
	topics: quizReducer.topics,
});

export default connect(mapStateToProps, {
	fetchQuizForEdit,
	fetchQuizQuestions,
	fetchTopics,
	editQuiz,
})(EditQuiz);
