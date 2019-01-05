import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { InputText } from 'primereact/inputtext';
import { AutoComplete } from 'primereact/autocomplete';

import { Button } from 'primereact/button';

const Wrapper = styled.div`
	border-radius: 4px;
	border: 1px solid;
	border-color: ${props => props.theme.accent};
	padding: 5px;
	background-color: ${props => props.theme.secondary};
	margin-bottom: 10px;
	display: flex;
	flex-direction: ${props => (props.main ? 'row' : 'column')};
	justify-content: ${props => props.main && 'space-between'};
	align-items: ${props => props.main && 'center'};
`;

const Title = styled.div`
	font-size: 18px;
	font-weight: 500;
	line-height: 22px;
	cursor: pointer;
	padding: 8px;
	padding-right: 10px;
	display: inline-block;
	color: ${props => (props.correct ? 'green' : props.theme.text)};
`;

const Topic = styled.a`
	font-weight: 700;
	color: ${props => props.theme.text};
	padding: 0 8px 8px;
`;

const InnerWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const EditUserQuiz = ({ quiz, edit, setEdit, topics, editQuiz, loading, ...props }) => {
	const [ searchTopics, setSearchOptions ] = useState(null);
	const [ quizName, setQuizName ] = useState('');
	const [ topic, setTopic ] = useState({});

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

	const handleClick = () => {
		if (!edit) setEdit(true);
		else {
			if (quizName !== quiz.title || topic.name.toLowerCase() !== quiz.topic.toLowerCase()) {
				editQuiz({ title: quizName, topic: topic.name });
			}
		}
	};

	if (loading)
		return (
			<Wrapper main>
				<div style={{ padding: '12px' }}>Loading...</div>
			</Wrapper>
		);
	else
		return (
			<Wrapper main>
				<InnerWrapper>
					{edit ? (
						<InputText value={quizName} onChange={e => setQuizName(e.target.value)} />
					) : (
						<Title>{quiz.title}</Title>
					)}

					{edit ? (
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
					) : (
						<Topic>{quiz.topic}</Topic>
					)}
				</InnerWrapper>
				<Button label={edit ? 'Save' : 'Edit'} onClick={handleClick} />
			</Wrapper>
		);
};

const mapStateToProps = ({ quizReducer, questionReducer }) => ({
	edittingQuiz: quizReducer.edittingQuiz,
	loading: quizReducer.loading,
	error: quizReducer.error,
	questions: questionReducer.questions,
	topics: quizReducer.topics,
});

export default connect(mapStateToProps)(EditUserQuiz);
