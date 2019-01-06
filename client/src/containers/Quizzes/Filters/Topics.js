import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button } from 'primereact/button';
import styled from 'styled-components';

const Wrapper = styled.div`
	position: absolute;
	top: 54px;
	left: -359px;
	max-width: 350px;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;

const Topic = ({ topic, handleFilter }) => {
	let [ disabled, setDisabled ] = useState(false);
	return (
		<Button
			label={topic.name}
			onClick={() => {
				setDisabled(!disabled);
				handleFilter(topic, disabled);
			}}
			style={{ margin: '3px' }}
			className={disabled ? 'p-button-rounded p-button-secondary' : 'p-button-rounded'}
			icon={!disabled && 'pi pi-times'}
			iconPos='right'
		/>
	);
};

const TopicSort = ({ topics, quizzes, changeQuizzes, allQuizzes }) => {
	console.log(topics, quizzes);
	let displayTopics = topics.filter(topic => allQuizzes.some(quiz => quiz.topic === topic.name));

	const filterQuizzes = (topic, disabled) => {
		if (!disabled) {
			changeQuizzes(quizzes.filter(quiz => quiz.topic === topic.name));
		} else {
			let topicQuizzes = allQuizzes.filter(quiz => quiz.topic === topic.name);
			changeQuizzes(quizzes.concat(topicQuizzes));
		}
	};
	return (
		<Wrapper>
			{displayTopics.map(topic => (
				<Topic key={topic.id} topic={topic} handleFilter={filterQuizzes} />
			))}
		</Wrapper>
	);
};

const mapStateToProps = ({ quizReducer }) => ({
	allQuizzes: quizReducer.quizzes,
});
export default connect(mapStateToProps)(TopicSort);
