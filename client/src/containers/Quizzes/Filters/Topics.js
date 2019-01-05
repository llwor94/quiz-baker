import React, { useEffect, useState } from 'react';
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
				handleFilter(topic);
			}}
			style={{ margin: '3px' }}
			className={disabled ? 'p-button-rounded p-button-secondary' : 'p-button-rounded'}
			icon={!disabled && 'pi pi-times'}
			iconPos='right'
		/>
	);
};

const TopicSort = ({ topics }) => {
	return <Wrapper>{topics.map(topic => <Topic topic={topic} />)}</Wrapper>;
};

export default TopicSort;
